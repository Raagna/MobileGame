import axios from 'axios';

const API_URL = 'http://10.0.0.98:8080/api/scores';

export const getHighScore = async() => {
	try {
	    const response = await axios.get(`${API_URL}/top`);
		console.log('Response:', response);
	    return response.data;
	  } catch (error) {
	    console.error('Error fetching top score:', error);
		console.log('Response:', response);
	    throw error;
	  }
	
};

export const updateHighScore = async(score) =>{
	
	try {
		const response = await axios.post(API_URL, {score});
		return response.data;
		
	} catch(error){
		console.error('Error update score:', error);
		throw error;
	}
	
}
export const isHighScore = async(score) =>{
	
	
	try {
		const response = await axios.get(`${API_URL}/check-score/${score}`);
		return response.data;
	} catch(error){
		console.error('Error checking high score:', error);
		throw error;	
	}
	
}