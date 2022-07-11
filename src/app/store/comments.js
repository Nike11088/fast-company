import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import localStorageService from '../services/localStorage.service'
import { nanoid } from 'nanoid'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        }
    }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated
} = actions

const commentCreateRequseted = createAction('comments/commentCreateRequseted')
const createCommentFailed = createAction('comments/createCommentFailed')

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsReceived(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const createComment = (payload) => async (dispatch) => {
    const comment = {
        ...payload.data,
        _id: nanoid(),
        pageId: payload.pageId,
        created_at: Date.now(),
        userId: localStorageService.getUserId()
    }
    dispatch(commentCreateRequseted())
    try {
        const { content } = await commentService.createComment(comment)
        dispatch(commentCreated(content))
    } catch (error) {
        dispatch(createCommentFailed(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading

export default commentsReducer
