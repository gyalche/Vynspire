import { create } from 'zustand';
import { postsApi } from '../api/mockApi';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
}

interface PostsState {
    posts: Post[];
    currentPost: Post | null;
    isLoading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    fetchPostById: (id: string) => Promise<void>;
    createPost: (post: Omit<Post, 'id' | 'date' | 'author'>) => Promise<void>;
    updatePost: (id: string, updates: Partial<Post>) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
}

export const usePosts = create<PostsState>((set, get) => ({
    posts: [],
    currentPost: null,
    isLoading: false,
    error: null,

    fetchPosts: async () => {
        set({ isLoading: true, error: null });
        try {
            const posts = await postsApi.getAll();
            set({ posts, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    fetchPostById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const post = await postsApi.getById(id);
            set({ currentPost: post, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    createPost: async (postData) => {
        set({ isLoading: true, error: null });
        try {
            const newPost = await postsApi.create(postData);
            set((state) => ({
                posts: [newPost, ...state.posts],
                isLoading: false
            }));
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    updatePost: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
            const updatedPost = await postsApi.update(id, updates);
            set((state) => ({
                posts: state.posts.map((p) => (p.id === id ? updatedPost : p)),
                currentPost: updatedPost,
                isLoading: false,
            }));
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    deletePost: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await postsApi.delete(id);
            set((state) => ({
                posts: state.posts.filter((p) => p.id !== id),
                isLoading: false,
            }));
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },
}));
