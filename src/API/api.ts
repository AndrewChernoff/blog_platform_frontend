import axios, { AxiosResponse } from 'axios'
import { PostItemType } from '../redux/posts/posts-slice'

const instance = axios.create({
	baseURL: 'http://localhost:4444',
})

export const api = {
    getPosts() {
        return /* axios.get('http://localhost:4444/posts')// */instance.get('posts')
        .then(res => res.data)
    }
}