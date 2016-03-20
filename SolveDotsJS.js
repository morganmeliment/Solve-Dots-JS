function isasquare(points) {
	var squareis = false
	var count;

	points.forEach(function(poinqt){
  		count = 0;
		for (var i = 0; i < points.length; i++) {
			if (String(points[i]) == String(poinqt)) {
    			count++;
    		}
		}
    	if (count > 1) {
    		squareis = true;
    	}
  	});

	return squareis;
}

function findsurrounding(row, index, color, grid) {
    var finalret = [];

    if (row > 1) {
    	finalret.push([row - 1, index]);
    } else {
    	finalret.push("n");
    }

    if (row < 6) {
    	finalret.push([row + 1, index]);
    } else {
    	finalret.push("n");
    }

    if (index > 1) {
    	finalret.push([row, index - 1]);
    } else {
    	finalret.push("n");
    }

    if (index < 6) {
    	finalret.push([row, index + 1]);
    } else {
    	finalret.push("n");
    }

    var top = "";
    var right = "";
    var bottom = "";
    var left = "";
    var itera = 0;
    var selfpotentialcombos = [];

    finalret.forEach(function(pos) {
    	itera++;
        
    	if (itera === 1) {
    		if (pos != "n") {
    			top = grid[pos[0] - 1][pos[1] - 1];
    		}
    	} else if (itera === 2) {
    		if (pos != "n") {
    			bottom = grid[pos[0] - 1][pos[1] - 1];
    		}
    	} else if (itera === 3) {
    		if (pos != "n") {
    			left = grid[pos[0] - 1][pos[1] - 1];
    		}
    	} else if (itera === 4) {
    		if (pos != "n") {
    			right = grid[pos[0] - 1][pos[1] - 1];
    		}
    	}
    });

    if (top === color) {
    	selfpotentialcombos.push([row - 1, index]);
    }
    if (right === color) {
    	selfpotentialcombos.push([row, index + 1]);
   	}
   	if (bottom === color) {
   		selfpotentialcombos.push([row + 1, index]);
   	}
    if (left === color) {
    	selfpotentialcombos.push([row, index - 1]);
    }

    return selfpotentialcombos;
}



function findmovesonboard(line1, line2, line3, line4, line5, line6, findindiv, strat) {
	var grid = [line1, line2, line3, line4, line5, line6];
    
 //   if (findsurrounding(1,1,"r", grid) !== findsurrounding(1,1,"r", ["rrgrbp", "pbyrgg", "pryyyr", "grrbbp", "ygrygg", "rgyyby"])) {
 //       debug(grid);
 //       debug(String(grid) == String(["rrgrbp", "pbyrgg", "pryyyr", "grrbbp", "ygrygg", "rgyyby"]));
 //       debug(findsurrounding(1,1,"r", grid)); 
 //   } 

  	var yellowsquares = [];
    var bluesquares = [];
    var greensquares = [];
    var purplesquares = [];
    var redsquares = [];

    function checkup(thedots, thecolor) {
    	var canapp = false;
    	var colorarray;

    	if (thedots.length >= 5) {
    		canapp = true;
    	}

    	if (thecolor === "y") {
    		colorarray = yellowsquares;
    	} else if (thecolor === "g") {
    		colorarray = greensquares;
    	} else if (thecolor === "b") {
    		colorarray = bluesquares;
    	} else if (thecolor === "r") {
    		colorarray = redsquares;
    	} else if (thecolor === "p") {
    		colorarray = purplesquares;
    	}

    	var yount;
    	colorarray.forEach(function(sd) {
    		yount = 0;
    		sd.forEach(function(sx) {
    			thedots.forEach(function(sa) {
    				if (String(sx) === String(sa)) {
    					yount++;
    				}
    			});
    		});
    		if (yount === colorarray.length) {
    			canapp = false;
    		}
    	});

    	if (canapp === true) {
    		colorarray.push(thedots);
            //debug("thisisa SQUARe: "+thedots+thecolor);
    	}
    }

	var anymove = [];
	var shud;
	var couont;

	function istruemove(dotzx, colf) {
		shud = true;
		dotzx.forEach(function(dotsx) {
			if (grid[dotsx[0] - 1][dotsx[1] - 1] === " ") {
				shud = false;
			}
		});
		if (shud === true) {
			anymove.forEach(function(valdot) {
				couont = 0;
				dotzx.forEach(function(aval) {
                    for (var u = 0; u < valdot[0].length; u++) {
                        if (String(valdot[0][u]) == String(aval)) {
                            couont++;
                        }
                    }
				});
				if ((couont === valdot[0].length) && (valdot[0].length === dotzx.length)) {
					shud = false;
				}
			});
		}
		if (shud === true) {
			anymove.push([dotzx, colf]);
            //debug(dotzx + " " + colf);
		}
	}

    var dotnum = 0;
    var dotrow = 0;

    grid.forEach(function(row) {
    	dotrow++;
    	row.split("").forEach(function(dot) {
    		if (String(dot) != " ") {
                //debug(dot);
    			dotnum = (dotnum % 6) + 1;
    			var surrounding = findsurrounding(dotrow, dotnum, dot, grid);
    			var stringofdots = [[dotrow, dotnum]];
    			if (findindiv === true) {
    				istruemove(stringofdots, dot);
    			}
    			var shape = "single";
    			var connecting = false;
    			if (surrounding.length > 0) {
    				shape = "double";
    			}
    			surrounding.forEach(function(combodot) {
    				stringofdots = [[dotrow, dotnum], combodot];
    				if (strat === true) {
    					istruemove(stringofdots, dot);
    				}
    				var nextsurrounding = findsurrounding(combodot[0], combodot[1], dot, grid);
                    for (var i = 0; i < nextsurrounding.length; i++) {
                        if (String(nextsurrounding[i]) == String([dotrow, dotnum])) {
                            nextsurrounding.splice(i, 1);
                        }
                    }
                   // var theindo = nextsurrounding.indexOf([dotrow, dotnum]);
                  //  if (theindo != -1) {
                 //       nextsurrounding.splice(theindo, 1);
                //    }
                    if (String(nextsurrounding) == String([dotrow, dotnum])) {
                        //debug(nextsurrounding);
                        //debug([dotrow, dotnum]);
                    }
                    
                    if (nextsurrounding.length > 0) {
                        shape = "triple";
                    }
                    nextsurrounding.forEach(function(anotherdot) {
                    	stringofdots = [[dotrow, dotnum], combodot, anotherdot];
                        //debug(stringofdots);
    					if (strat === true) {
    						istruemove(stringofdots, dot);
    					}
    					var nnextsurrounding = findsurrounding(anotherdot[0], anotherdot[1], dot, grid);
                    	for (i = 0; i < nnextsurrounding.length; i++) {
                            if (String(nnextsurrounding[i]) == String(combodot)) {
                                nnextsurrounding.splice(i, 1);
                            }
                        }
                    	if (nnextsurrounding.length > 0) {
                    	    shape = "quad";
                    	}
                    	nnextsurrounding.forEach(function(aanotherdot) {
                    		stringofdots = [[dotrow, dotnum], combodot, anotherdot, aanotherdot];
                            if (strat == true) {
                                istruemove(stringofdots, dot);
                            }
                            var nnnextsurrounding = findsurrounding(aanotherdot[0], aanotherdot[1], dot, grid);
                            for (i = 0; i < nnnextsurrounding.length; i++) {
                                if (String(nnnextsurrounding[i]) == String(anotherdot)) {
                                    nnnextsurrounding.splice(i, 1);
                                }
                            }
                            if (nnnextsurrounding.length >= 1) {
                                shape = "quint";
                            }
                            nnnextsurrounding.forEach(function(aaanotherdot) {
                            	stringofdots = [[dotrow, dotnum], combodot, anotherdot, aanotherdot, aaanotherdot];
                                //debug(stringofdots);
                                istruemove(stringofdots, dot);
                                var nnnnextsurrounding = findsurrounding(aaanotherdot[0], aaanotherdot[1], dot, grid);
                                for (i = 0; i < nnnnextsurrounding.length; i++) {
                                    if (String(nnnnextsurrounding[i]) == String(aanotherdot)) {
                                        nnnnextsurrounding.splice(i, 1);
                                    }
                                }
                                if (nnnnextsurrounding.length >= 1) {
                                    shape = "hecta";
                                }
                                nnnnextsurrounding.forEach(function(aaaanotherdot) {
                                	stringofdots = [[dotrow, dotnum], combodot, anotherdot, aanotherdot, aaanotherdot, aaaanotherdot];
                                    istruemove(stringofdots, dot);
                                    var nnnnnextsurrounding = findsurrounding(aaaanotherdot[0], aaaanotherdot[1], dot, grid);
                                    for (i = 0; i < nnnnnextsurrounding.length; i++) {
                                        if (String(nnnnnextsurrounding[i]) == String(aaanotherdot)) {
                                            nnnnnextsurrounding.splice(i, 1);
                                        }
                                    }
                                    if (nnnnnextsurrounding.length >= 1) {
                                        shape = "sept";
                                    }
                                    nnnnnextsurrounding.forEach(function(aaaaanotherdot) {
                                    	stringofdots = [[dotrow, dotnum], combodot, anotherdot, aanotherdot, aaanotherdot, aaaanotherdot, aaaaanotherdot];
                                        istruemove(stringofdots, dot);
                                        var nnnnnnextsurrounding = findsurrounding(aaaaanotherdot[0], aaaaanotherdot[1], dot, grid);
                                        for (i = 0; i < nnnnnnextsurrounding.length; i++) {
                                            if (String(nnnnnnextsurrounding[i]) == String(aaaanotherdot)) {
                                                nnnnnnextsurrounding.splice(i, 1);
                                            }
                                        }
                                        if (nnnnnnextsurrounding.length >= 1) {
                                            shape = "octa";
                                        }
                                    });
                                });
                            });
                    	});
                    });
    			});
    		} else {
    			dotnum = (dotnum % 6) + 1;
    		}
    	});
    });

    var potentialmoves = [];

    anymove.forEach(function(randommove) {
    	if (randommove[0].length >= 5) {
    		if (isasquare(randommove[0]) === true) {
    			checkup(randommove[0], randommove[1]);
    		} else {
    			potentialmoves.push([randommove[1], randommove[0], randommove[0].length]);
    		}
    	} else {
    		potentialmoves.push([randommove[1], randommove[0], randommove[0].length]);
    	}
    });

    var amntofyellowdots = 0;
    var amntofgreendots = 0;
    var amntofreddots = 0;
    var amntofbluedots = 0;
    var amntofpurpledots = 0;

    grid.forEach(function(linezq) {
    	linezq.split("").forEach(function(dot12) {
    		if (dot12 === "y") {
               amntofyellowdots++;
    		} else if (dot12 === "g") {
                amntofgreendots++;
    		} else if (dot12 === "b") {
                amntofbluedots++;
    		} else if (dot12 === "r") {
                amntofreddots++;
    		} else if (dot12 === "p") {
                amntofpurpledots++;
    		}
    	});
    });

    yellowsquares.forEach(function(ysq) {
    	potentialmoves.push(["y", ysq, amntofyellowdots]);
    });
    greensquares.forEach(function(gsq) {
        potentialmoves.push(["g", gsq, amntofgreendots]);
    });
    bluesquares.forEach(function(bsq) {
        potentialmoves.push(["b", bsq, amntofbluedots]);
    });
    purplesquares.forEach(function(psq) {
        potentialmoves.push(["p", psq, amntofpurpledots]);
    });
    redsquares.forEach(function(rsq) {
        potentialmoves.push(["r", rsq, amntofreddots]);
    });

	return potentialmoves;
}

function removedots(lineoneq, linetwoq, linethreeq, linefourq, linefiveq, linesixq, possmove) {
    var gridline = [lineoneq.split(""), linetwoq.split(""), linethreeq.split(""), linefourq.split(""), linefiveq.split(""), linesixq.split("")];
    var pointstoremove = [];
    var cvb;
    if (possmove[1].length > 4) {
        if (isasquare(possmove[1]) === true) {
            cvb = 0;
            lineoneq.split("").forEach(function(colodot) {
                cvb++;
                if (colodot === possmove[0]) {
                    pointstoremove.push([1, cvb]);
                }
            });
            cvb = 0;
            linetwoq.split("").forEach(function(colodot) {
                cvb++;
                if (colodot === possmove[0]) {
                    pointstoremove.push([2, cvb]);
                }
            });
            cvb = 0;
            linethreeq.split("").forEach(function(colodot) {
                cvb++;
                if (colodot === possmove[0]) {
                    pointstoremove.push([3, cvb]);
                }
            });
            cvb = 0;
            linefourq.split("").forEach(function(colodot) {
                cvb++;
                if (colodot === possmove[0]) {
                    pointstoremove.push([4, cvb]);
                }
            });
            cvb = 0;
            linefiveq.split("").forEach(function(colodot) {
                cvb++;
                if (colodot === possmove[0]) {
                    pointstoremove.push([5, cvb]);
                }
            });
            cvb = 0;
            linesixq.split("").forEach(function(colodot) {
                cvb++;
                if (colodot === possmove[0]) {
                    pointstoremove.push([6, cvb]);
                }
            });
        } else {
            pointstoremove = possmove[1];
        }
    } else {
        pointstoremove = possmove[1];
    }
    
    pointstoremove.forEach(function(point) {
        var pointsaboveremove = [];
        var num = point[0]
        for (num; num > 0; num--) {
            pointsaboveremove.push([num, point[1]]);
        }
        num = pointsaboveremove.length;
        pointsaboveremove.forEach(function(pointtwo) {
            num--;
            if (num === 0) {
                gridline[0][pointtwo[1] - 1] = " ";
            } else {
                gridline[pointtwo[0] - 1][pointtwo[1] - 1] = gridline[pointtwo[0] - 2][pointtwo[1] - 1];
            }
        });
    });

    return gridline;
}

 
//"bbpryp""ppbprr""brpbyy""rpybbr""ybyrry""yryyyy"
function dotsapi(griddy) {
  var roundscores = [];

  var lineone = String(griddy.splice(0, 6)).replace(/,/g, '');
  var linetwo = String(griddy.splice(0, 6)).replace(/,/g, '');
  var linethree = String(griddy.splice(0, 6)).replace(/,/g, '');
  var linefour = String(griddy.splice(0, 6)).replace(/,/g, '');
  var linefive = String(griddy.splice(0, 6)).replace(/,/g, '');
  var linesix = String(griddy.splice(0, 6)).replace(/,/g, '');

  debug(lineone);
  debug(linetwo);
  debug(linethree);
  debug(linefour);
  debug(linefive);
  debug(linesix);

  var roundonepossiblemoves = findmovesonboard(lineone, linetwo, linethree, linefour, linefive, linesix, true, true);

  roundonepossiblemoves.forEach(function(move) {
      var roundonescore = move[2];
      var potarry = removedots(lineone, linetwo, linethree, linefour, linefive, linesix, move);
      var newpotarry = [];
      potarry.forEach(function(line) {
          var finstrin = "";
          line.forEach(function(letter) {
              finstrin = finstrin + letter;
          });
          newpotarry.push(finstrin);
      });
      var strategy = true;
      if (move[2] < 5) {
          strategy = false;
      }
      var roundtwopossiblemoves = findmovesonboard(newpotarry[0], newpotarry[1], newpotarry[2], newpotarry[3], newpotarry[4], newpotarry[5], false, strategy);
      if (roundtwopossiblemoves === []) {
          var c = 0;
      } else {
          var highestpossibledotremoval = 0;
          var bestoutcomefortheround = [];
          var eachround = [0, 0];
          roundtwopossiblemoves.forEach(function(movetwo) {
              var moveresult = movetwo[2] + move[2];
              if (highestpossibledotremoval < moveresult) {
                  highestpossibledotremoval = moveresult;
                  bestoutcomefortheround = [move, movetwo];
                  eachround = [move[2], movetwo[2]];
              }
          });
          if (highestpossibledotremoval != 0) {
            roundscores.push(bestoutcomefortheround);
          }
      }
  });

  highestpossibledotremoval = 0;
  bestoutcomefortheround = ["Restart"];
  roundscores.forEach(function(moves) {
      moveresult = moves[0][2] + moves[1][2];
      if (highestpossibledotremoval < moveresult) {
          highestpossibledotremoval = moveresult;
          bestoutcomefortheround = [moves[0], moves[1]];
      }
  });
    debug(bestoutcomefortheround);
}
dotsapi(["b","b","p","r","y","p","p","p","b","p","r","r","b","r","p","b","y","y","r","p","y","b","b","r","y","b","y","r","r","y","y","r","y","y","y","y"]);










