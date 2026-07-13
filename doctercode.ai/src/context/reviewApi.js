import api from '../context/axios';

export const createReview = (data) => api.post('/reviews/', data);