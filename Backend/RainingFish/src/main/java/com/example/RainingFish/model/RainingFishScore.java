package com.example.RainingFish.model;

import jakarta.persistence.*;


@Entity
@Table(name = "high_score")
public class RainingFishScore{
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generate the 'id' (auto-increment)
    private Long id;
	
	@Column(nullable = false, columnDefinition = "INTEGER DEFAULT 0")
    private Integer score = 0;
	
	// Constructors
    public RainingFishScore() {}
	
	
    public RainingFishScore(int score) {
        this.score = score;
    }
	
	
	// Getters and Setters
    public int getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }
}
