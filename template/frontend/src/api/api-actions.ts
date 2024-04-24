import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../hooks/use-app-dispatch";
import { State } from "../types/state";
import { AxiosInstance } from "axios";
import { TAddTodo, ToDo } from "../store/app-data";

type TAuthThunk = {dispatch: AppDispatch, state: State, extra: AxiosInstance}

type DeleteProps = {
    id: number;
}

export const fetchTodos = createAsyncThunk<any, undefined, TAuthThunk>(
 'AppData/fetchTodos',
 async (_arg, {extra: api}) => {
    const { data } = await api.get('/sfsdf');
    return data
 }
)

export const uploadTodo = createAsyncThunk<any, TAddTodo, TAuthThunk>(
    'AppData/uploadTodo',
    async ({title}, {extra: api}) => {
        const {data} = await api.post("/sdfds", {title})
        return data
    } 
)

export const deleteTodo = createAsyncThunk<void, DeleteProps, TAuthThunk>(
    'AppData/deleteTodo',
    async ({id}, {extra: api}) => {
        const {data} = await api.delete(`/sdssdf/${id}`)
        return data
    }
)