// function to calculate the result of the survey
questions = [
[0, 'I eat a balanced nutritional diet'],
[1, 'I exercise at least 3 times per week'],
[2, 'I sleep at least 7-8 hours every night'],
[3, 'I use do not use alcohol (or in moderation)<br>and am a non-smoker'],
[4, 'I am generally in free from illness'],
[5, 'I am a reasonable weight for my height'],
[6, 'I have a solid balance between saving for the future and spending for the present'],
[7, 'My beliefs/values surrounding money<br>are harmonious with my behavior'],
[8, 'What I am doing with work has purpose'],
[9, 'I use money positivity (little or no gambling or excessive accumulation of goods)'],
[10, 'I have a balance between my work activities<br>and the other areas of my life'],
[11, 'I have financial plans for the future'],
[12, 'I have specific intellectual goals <br>(learning a new skill or hobby)'],
[13, 'I pursue mentally stimulating interests or hobbies'],
[14, 'I am generally satisfied with my educational achievements and vocation'],
[15, 'I have positive thoughts (a low degree of negativity and cynicism)'],
[16, 'I consider myself to be a life-long learner'],
[17, 'I commit time and energy to professional<br>and/or self-development'],
[18, 'I have a sense of humor and value fun and laughter'],
[19, 'I am able to feel and label my feelings'],
[20, 'I express my feelings appropriately'],
[21, 'I have a sense of control in my life<br>and I am able to adapt to change'],
[22, 'I am able to comfort or console myself when I am troubled'],
[23, 'Others would describe me as emotional stable'],
[24, 'I am able to resolve conflicts in all areas of my life'],
[25, 'I am aware of the feelings of others<br>and can respond appropriately'],
[26, 'I have at least three people with whom<br>I have a close, trusting relationship'],
[27, 'I am aware of and able to set and respect<br>my own and others\' boundaries'],
[28, 'I have satisfying social interaction with others'],
[29, 'I have a sense of belonging/not being isolated'],
[30, 'I practice meditation, pray or engage<br>in some type of growth practice'],
[31, 'I have a general sense of serenity'],
[32, 'I have faith in a higher power'],
[33, 'I have a sense of meaning and purpose in my life'],
[34, 'I trust others and am able to forgive others and myself; I can let go'],
[35, 'Principles, ethics and/or morals provide guides for my life']];

choices = [];

// orange, yellow, red, blue, green, purple
var colors = ["#fc7214", "#ff0", "#ff1616", "#5039f9", "#1da500", "#41008c"];

var categories = ["Physical", "Financial", "Intellectual", "Emotional", "Social", "Spiritual"];

var c = -0.01 // 0.01 if the lines between slices are bothersome
var c2 = 0.05

var canvas_dim = window.innerHeight / 1.75;
var circle_outline_width = 3
var border_offset = 8

qid = 0
switchtest = 0

function get_questions() {
  if (qid > 35) {
    question_html = "<h1>Thank you for taking the time to answer!<br>The quiz is now over.</h1>"
    document.getElementById("yesb").style.display="none";
    document.getElementById("nob").style.display="none";
    document.getElementById("printb").style.display="flex";
  } else {
    question_html = '<h1>' + questions[qid][1] + '</h1>';
  }
  document.getElementById("quiz").innerHTML = question_html; 
}

function build_minimalist_wheel(){
  var myCanvas = document.getElementById("wellness_wheel");
  var ctx = myCanvas.getContext("2d");
  myCanvas.width = canvas_dim * 1.5;
  myCanvas.height = canvas_dim;
  drawPieSlice(ctx, myCanvas.width / 2, canvas_dim / 2, canvas_dim / 2,  0, 2 * Math.PI, "#0");
  drawPieSlice(ctx, myCanvas.width / 2, canvas_dim / 2, canvas_dim / 2 - circle_outline_width,  0, 2 * Math.PI, "#fff");
}

function addLabel(ctx, currLoc) {
  if (currLoc % 6 === 0) {
    console.log("labeled");
    ctx.fillStyle = colors[qid / 6];
    ctx.font = "bold 130% Open Sans";

    switch(switchtest) {
      case 0:
        ctx.fillText(categories[qid / 6], canvas_dim * 1.15, canvas_dim * 0.125);
        break;
      case 1:
        ctx.fillText(categories[qid / 6], canvas_dim * 1.27, canvas_dim * 0.5);
        break;
      case 2:
        ctx.fillText(categories[qid / 6], canvas_dim * 1.15, canvas_dim * 0.9);
        break;
      case 3:
        ctx.fillText(categories[qid / 6], canvas_dim - (canvas_dim * 0.89), canvas_dim * 0.9);
        break;
      case 4:
        ctx.fillText(categories[qid / 6], canvas_dim - (canvas_dim * 0.93), canvas_dim * 0.5);
        break;
      case 5:
        ctx.fillText(categories[qid / 6], canvas_dim - (canvas_dim * 0.85), canvas_dim * 0.125);  
        break;              
    }

    switchtest += 1
  }
}

function build_wheel(answer) {
  var selection = document.getElementsByTagName('input');
  if (answer === 1) {
    choices.push("y");
  } else if (answer === 0) {
    choices.push("n");
  }

  var myCanvas = document.getElementById("wellness_wheel");
  var ctx = myCanvas.getContext("2d");

  addLabel(ctx, qid);

  qid += 1;
  if (qid < 37) {
    get_questions();
  }

  //console.log(choices)
  for (var i = 0; i < questions.length; i++){
    if (choices[i] === "y"){
      drawPieSlice(ctx, myCanvas.width / 2, canvas_dim / 2, canvas_dim / 2 - border_offset,  ( i * Math.PI / (questions.length / 2) ) - Math.PI / 2 - c, ( ( i + 1 ) * Math.PI / (questions.length / 2 ) ) - Math.PI / 2 + c, colors[ Math.floor( i / (questions.length / 6 ) ) ]);
      drawPieSlice(ctx, myCanvas.width / 2, canvas_dim / 2, canvas_dim / 4,  ( i * Math.PI / (questions.length / 2) ) - Math.PI / 2 - c2, ( ( i + 1 ) * Math.PI / (questions.length / 2 ) ) - Math.PI / 2 + c2, "#ffffff");
    } else if (choices[i] === "n") {
      drawPieSlice(ctx, myCanvas.width / 2, canvas_dim / 2, canvas_dim / 2 - border_offset,  ( i * Math.PI / (questions.length / 2) ) - Math.PI / 2 - c, ( ( i + 1 ) * Math.PI / (questions.length / 2 ) ) - Math.PI / 2 + c, "#D3D3D3");
      drawPieSlice(ctx, myCanvas.width / 2, canvas_dim / 2, canvas_dim / 4,  ( i * Math.PI / (questions.length / 2) ) - Math.PI / 2 - c2, ( ( i + 1 ) * Math.PI / (questions.length / 2 ) ) - Math.PI / 2 + c2, "#ffffff");      
    }
  }
}

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}