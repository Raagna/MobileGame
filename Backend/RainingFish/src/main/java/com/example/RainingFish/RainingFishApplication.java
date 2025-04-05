package com.example.RainingFish;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages = "com.example.RainingFish")
public class RainingFishApplication {

	public static void main(String[] args) {
		SpringApplication.run(RainingFishApplication.class, args);
	}

}
