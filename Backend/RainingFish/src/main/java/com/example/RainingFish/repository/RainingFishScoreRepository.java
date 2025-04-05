package com.example.RainingFish.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.RainingFish.model.RainingFishScore; 


@Repository
public interface RainingFishScoreRepository extends JpaRepository<RainingFishScore, Long>{
	@Query("SELECT h FROM RainingFishScore h WHERE h.id = 1")
	RainingFishScore getScore();
}
