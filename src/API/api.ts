import axios, { AxiosResponse } from 'axios'
import { PostItemType } from '../redux/posts/posts-slice'

const instance = axios.create({
	baseURL: 'http://localhost:4444',
})

export const api = {
    getPosts() {
        return instance.get('posts')
        .then(res => res.data)
    },
    getTags() {
        return instance.get('/tags')
        .then(res => res.data)
    }
}