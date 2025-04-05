package com.example.RainingFish.service;

import org.springframework.stereotype.Service;

import com.example.RainingFish.model.RainingFishScore;
import com.example.RainingFish.repository.RainingFishScoreRepository;

@Service
public class RainingFishScoreService {
	
    private RainingFishScoreRepository rainingFishScoreRepository;
    
    
    public RainingFishScoreService(RainingFishScoreRepository rainingFishScoreRepository) {
	    this.rainingFishScoreRepository = rainingFishScoreRepository;
	}
    
    public RainingFishScore getHighScore() {
    	//System.out.println(RainingFishScoreRepository.getScore());
    	return rainingFishScoreRepository.getScore();
    }
    
    public RainingFishScore updateHighScore(int score) {
    	RainingFishScore currentScore = getHighScore();
    	if (currentScore == null) {
            // If no current high score exists, create a new one
            currentScore = new RainingFishScore(score);
            //System.out.println("no score, added new one");
        }else {
        	currentScore.setScore(score);
        }
    	return rainingFishScoreRepository.save(currentScore);
    }
    public boolean isHighScore(int score) {
    	RainingFishScore currentScore = getHighScore();
    	return score > currentScore.getScore(); 
    }
    
    
}
