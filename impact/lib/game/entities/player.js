ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

	size: {x: 14, y:14},
	offset: {x: 0, y: 0},
	gravityFactor:0,
	maxVel: {x: 100, y: 100},
	friction: {x: 0, y: 0},
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.FIXED,
	animSheet: new ig.AnimationSheet( 'media/yellowball.png', 14, 14 ),
	accelGround: 100,

	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );

	},
	
	
	update: function() {

        var posx = this.pos.x +7;
        var posy = this.pos.y+7;
        var pValue = ig.game.pillMap.getValue(posx,posy);

        if (pValue > 0){

            // remove the pill from the map  &  Set Value Tile
            ig.game.pillMap.setValue(posx,posy,0);
            ig.game.pills.Map.setTile(posx,posy,0);
            ig.game.updatePills=true;
        }

		if( ig.input.state('left') ) {
			this.vel.x = -this.accelGround;

		}
		else if( ig.input.state('right') ) {
			this.vel.x = this.accelGround;

		}
        else {
            this.vel.x = 0;
        }

        if( ig.input.state('up') ) {
            this.vel.y = -this.accelGround;

        }
        else if( ig.input.state('down') ) {
            this.vel.y = this.accelGround;

        }
		else {
            this.vel.y=0;
		}

		this.parent();
	} ,
    draw: function(force)
    {
        "use strict";
        if (force){
            this.parent();
        }
    }
});

});