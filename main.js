prediction_1 = ""
prediction_2 = ""

Webcam.set({
    with:350,
    height:300,
    image_format: "png",
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");


function take_snapshot()
{
   Webcam.snap(function(data_uri){ 
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
   }); 
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/DcVO0Sob6/model.json", modelLoaded);


function modelLoaded(){
    console.log ("Modelo cargado!");
}


function speak(){
   var snyth = window.speechSynthesis;
   speak_data_1 = "La primera prediccion es" + prediction_1;
   speak_data_2 = "La segunda prediccion es" + prediction_2;
   var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
   snyth.speak(utterThis);
}




function check(){

img = document.getElementById('captured_image');
 classifier.classify(img, gotResult); 

}





function gotResult(error, results){
if (error){
console.error(error);
} else {
console.log(results);

document.getElementById("result_emotion_name").innerHTML = results[0].label;
 document.getElementById("result_emotion_name2").innerHTML = results[0].label;
prediction_1 = results[0].label;
prediction_2 = results[1].label;
speak();
if (results[0].label == "bien")
{
    document.getElementById("update_emoji").innerHTML= "&#128077;";
}


if (results[0].label == "genial")
{
    document.getElementById("update_emoji").innerHTML= "&#128076;";
}


if (results[0].label == "victoria")
{
    document.getElementById("update_emoji").innerHTML= "&#9996;";
}





if (results[1].label == "bien")
{
    document.getElementById("update_emoji").innerHTML= "&#128077;";
}


if (results[1].label == "genial ")
{
    document.getElementById("update_emoji").innerHTML= "&#128076;";
}


if (results[1].label == "victoria")
{
    document.getElementById("update_emoji").innerHTML= "&#9996;";
}
}

}
