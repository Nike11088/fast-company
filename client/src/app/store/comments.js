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
        },
        createCommentFailed: (state, action) => {
            state.error = action.payload
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (comment) => comment._id !== action.payload
            )
        },
        removeCommentFailed: (state, action) => {
            state.error = action.payload
        }
    }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    createCommentFailed,
    commentRemoved,
    removeCommentFailed
} = actions

const commentCreateRequseted = createAction('comments/commentCreateRequseted')
const commentRemoveRequseted = createAction('comments/commentRemoveRequseted')

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsReceived(content))
    } catch (error) {
        dispatch(commentsRequestFailed(error.message))
    }
}

export const createComment =
    ({ data, pageId }) =>
    async (dispatch) => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: pageId,
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

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentRemoveRequseted())
    try {
        const { content } = await commentService.removeComment(commentId)
        if (content === null) {
            dispatch(commentRemoved(commentId))
        }
    } catch (error) {
        dispatch(removeCommentFailed(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading

export default commentsReducer
