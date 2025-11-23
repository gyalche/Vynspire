import { useAuth } from '../store/authStore';

// Mock Data
const MOCK_USERS = [
    { id: '1', email: 'user@example.com', password: 'password', name: 'Demo User' },
];

let MOCK_POSTS = [
    {
        id: '1',
        title: 'The Future of Web Development',
        excerpt: 'Exploring the latest trends in frontend frameworks and tools.',
        content: 'Full content about web development...',
        author: 'Demo User',
        date: '2023-10-25',
        category: 'Tech',
    },
    {
        id: '2',
        title: 'Mastering Tailwind CSS',
        excerpt: 'How to build beautiful UIs rapidly with utility classes.',
        content: 'Full content about Tailwind...',
        author: 'Demo User',
        date: '2023-10-26',
        category: 'Design',
    },
    {
        id: '3',
        title: 'React Server Components',
        excerpt: 'Understanding the paradigm shift in React rendering.',
        content: 'Full content about RSC...',
        author: 'Demo User',
        date: '2023-10-27',
        category: 'Tech',
    },
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
    login: async (email: string, password: string) => {
        await delay(800);
        const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
        if (user) {
            return {
                user: { id: user.id, name: user.name, email: user.email },
                token: 'mock-jwt-token-' + Math.random().toString(36).substr(2),
            };
        }
        throw new Error('Invalid credentials');
    },
    register: async (email: string, password: string, name: string) => {
        await delay(800);
        const newUser = { id: Math.random().toString(), email, password, name };
        MOCK_USERS.push(newUser);
        return {
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
            token: 'mock-jwt-token-' + Math.random().toString(36).substr(2),
        };
    },
};

export const postsApi = {
    getAll: async () => {
        await delay(500);
        return [...MOCK_POSTS];
    },
    getById: async (id: string) => {
        await delay(500);
        const post = MOCK_POSTS.find((p) => p.id === id);
        if (!post) throw new Error('Post not found');
        return post;
    },
    create: async (post: any) => {
        await delay(800);
        const newPost = {
            ...post,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0],
            author: 'Demo User', // Simplified
        };
        MOCK_POSTS = [newPost, ...MOCK_POSTS];
        return newPost;
    },
    update: async (id: string, updates: any) => {
        await delay(800);
        const index = MOCK_POSTS.findIndex((p) => p.id === id);
        if (index === -1) throw new Error('Post not found');

        MOCK_POSTS[index] = { ...MOCK_POSTS[index], ...updates };
        return MOCK_POSTS[index];
    },
    delete: async (id: string) => {
        await delay(800);
        MOCK_POSTS = MOCK_POSTS.filter((p) => p.id !== id);
        return true;
    },
};
