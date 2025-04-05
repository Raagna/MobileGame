import Matter from 'matter-js';
import { Dimensions, } from "react-native";

// SCREEN DIMENSIONS
const SCREEN_DIMENSIONS = Dimensions.get('window');
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;
const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;

// BOX TOUCH MOVEMENT
const MoveBox = (entities, { touches }) => {
	const barrel = entities["barrel"];
	const floor = entities["floor"];
	const { x: fx, y: fy } = floor.body.position;
	const floorTopEdge = SCREEN_HEIGHT - 70 - 25; // 70 is the floor's position, and 25 is half its height (50 / 2)
	const errorX = 100;
	const errorY = 150;
		
  // Check for touch events
  const startTouch = touches.find(t => t.type === "start" || t.type === "move");

  if (startTouch) {
    
    if (barrel && barrel.body) {
		const { x, y } = barrel.body.position;
	 	const size = barrel.size[0];
		const touchX = startTouch.event.pageX ?? x; // 🛑 Ensure touchX is valid
		const touchY = startTouch.event.pageY ?? y;
	    const isTouchInsideBox =
	      touchX >= x - size / 2 &&
	      touchX <= x + size / 2 &&
	      touchY >= y &&
	      touchY <= y + size*2;
		if (isTouchInsideBox) {
			// bunch of if conditions to make sure barrel doesnt go of screen
		   if (barrel.body.position.x + errorX > SCREEN_WIDTH){
		   		Matter.Body.setPosition(barrel.body, { x: SCREEN_WIDTH - errorX, y: floorTopEdge - (size/2) - 5});
		   	}
		   	if (barrel.body.position.x - errorX < 0){
		   		Matter.Body.setPosition(barrel.body, { x: errorX, y: floorTopEdge - (size/2) - 5});
		   	}
			if (barrel.body.position.y + errorY > floorTopEdge) {
			  Matter.Body.setPosition(barrel.body, { x: startTouch.event.pageX, y: floorTopEdge - (size/2) - 5}); // -5 to adjust for gravity glitching
			}
			if (barrel.body.position.y - errorY < floorTopEdge) {
			  Matter.Body.setPosition(barrel.body, { x: startTouch.event.pageX, y: floorTopEdge - (size/2) - 5});
			}
	    }
		
		//console.log(`Box Position - X: ${barrel.body.position.x}, Y: ${barrel.body.position.y} ${size} ${isTouchInsideBox} {${fx},${fy}}, {${SCREEN_WIDTH},${SCREEN_HEIGHT}}`);
		    
	  	}
  }

  return entities;
};


// PHYSICS SYSTEM
export const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};



// FISH/SHARK MOVE SYSTEM
export const MoveSystem = (entities, { time, gameScore = 0}) => {
	const scoreMultiplier = 1 + Math.floor(gameScore / 10) * 0.2;
	
	// Move fish and sharks downward
	Object.keys(entities).forEach(key => {
	    if (key.startsWith('fish_') || key.startsWith('shark_')) {
	      const entity = entities[key];
	      if (entity && entity.body) {
			
	        const speed = entity.type === 'shark' ? 2 : 1.5;
			
			const adjustedSpeed = speed * scoreMultiplier;
			
	        Matter.Body.setVelocity(entity.body, { x: 0, y: adjustedSpeed });
			//console.log(`${adjustedSpeed}`)
	      }
	    }
	  });
  
  return entities;
};


// COLLISION SYSTEM
export const CollisionSystem = (entities, { events, dispatch }) => {
  const { barrel, physics } = entities;
  const floorTopEdge = SCREEN_HEIGHT - 70 - 25;
  const barrelSize = barrel.size[0];
  
  
  Matter.Body.setVelocity(barrel.body, { x: 0, y: 0 });
  if (barrel && barrel.body) {
     const currentPosition = barrel.body.position;
     const desiredY = floorTopEdge - (barrelSize/2) - 5;
     
     // Only adjust Y, keep X as is
     if (currentPosition.y !== desiredY) {
       Matter.Body.setPosition(barrel.body, {
         x: currentPosition.x,
         y: desiredY
       });
     }
   }
  
  // Check for collisions between barrel and fish/sharks
  Object.keys(entities).forEach(key => {
    if (key.startsWith('fish_')) {
      const entity = entities[key];
      
      // Check collision with barrel
      if (entity && entity.body && barrel && barrel.body) {
        const collision = Matter.Collision.collides(barrel.body, entity.body);
        
        if (collision && collision.collided) {
          dispatch({ type: "score" });
          resetEntityPosition(entity, key);
        }
      }
      
      // Check if entity is below floor (missed)
      if (entity && entity.body && entity.body.position.y > SCREEN_HEIGHT - 100) {
        resetEntityPosition(entity, key);
      }
    }
	if (key.startsWith('shark_')) {
      const entity = entities[key];
      
      // Check collision with barrel
      if (entity && entity.body && barrel && barrel.body) {
        const collision = Matter.Collision.collides(barrel.body, entity.body);
        
        if (collision && collision.collided) {
          dispatch({ type: "heart" });
          resetEntityPosition(entity, key);
        }
      }
      
      // Check if entity is below floor (missed)
      if (entity && entity.body && entity.body.position.y > SCREEN_HEIGHT - 50) {
        resetEntityPosition(entity, key);
      }
    }
	return entities;
  });
  
  
  // Helper function to reset an entity to its initial position
  function resetEntityPosition(entity, key) {
    // Get initial Y position based on type
    const yPos = key.startsWith('fish_') ? 
      entities[key].initialY : 
      entities[key].initialY;
    
    // Reset position
    Matter.Body.setPosition(entity.body, { 
      x: Math.random() * (SCREEN_WIDTH - 100) + 50, 
      y: yPos - 200 
    });
    
    // Reset velocity
    Matter.Body.setVelocity(entity.body, { x: 0, y: 0});
  }
  
  return entities;
};

export { MoveBox, CollisionSystem, Physics, MoveSystem  };

