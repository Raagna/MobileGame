package com.example.RainingFish.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.RainingFish.model.RainingFishScore;
import com.example.RainingFish.service.RainingFishScoreService;


@RequestMapping("/api/scores")
@CrossOrigin(origins = "*") // Allow cross-origin requests from mobile app
@RestController
public class RainingFishScoreController {
	
	private RainingFishScoreService rainingFishScoreService;
	
	
	
	public RainingFishScoreController(RainingFishScoreService rainingFishScoreService) {
	    this.rainingFishScoreService = rainingFishScoreService;
	}
	
	@GetMapping("/top")
	public ResponseEntity<RainingFishScore> getSingleHighScore() {
	    return ResponseEntity.ok(rainingFishScoreService.getHighScore());
	}
	
	@PostMapping
    public ResponseEntity<RainingFishScore> updateScore(@RequestBody RainingFishScore rainingFishScoreService1) {
        return ResponseEntity.ok(rainingFishScoreService.updateHighScore(rainingFishScoreService1.getScore()));
    }
    
    @GetMapping("/check-score/{score}")
    public ResponseEntity<Boolean> checkIfHighScore(@PathVariable int score) {
        return ResponseEntity.ok(rainingFishScoreService.isHighScore(score));
    }

}
