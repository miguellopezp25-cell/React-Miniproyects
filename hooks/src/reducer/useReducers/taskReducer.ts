import * as z from "zod";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

type TaskAction =
  | { type: "add"; payload: string }
  | { type: "toggle"; payload: number }
  | { type: "delete"; payload: number };

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TodoTaskState = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getInitialValues = (): TaskState => {
  const todosStored = localStorage.getItem("task-state");
  if (!todosStored) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }

  //validate
  const result = TodoTaskState.safeParse(JSON.parse(todosStored));

  if (result.error) {
    console.log(result.error);
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }
  return result.data;
};
export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "add": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.length + 1,
        pending: state.pending + 1,
      };
    }
    case "toggle": {
      const currentTodo = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      return {
        ...state,
        todos: currentTodo,
        pending: currentTodo.filter((todo) => !todo.completed).length,
        completed: currentTodo.filter((todo) => todo.completed).length,
      };
    }
    case "delete": {
      const currentTodo = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: currentTodo,
        length: state.length,
        pending: currentTodo.filter((todo) => !todo.completed).length,
        completed: currentTodo.filter((todo) => todo.completed).length,
      };
    }
    default:
      return state;
  }
};
