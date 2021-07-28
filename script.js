//function for creating buttons
function pagination (startidx){
  const pagediv =  document.createElement("div");
  pagediv.className = "page-div";
  const firstpage = document.createElement("button");
  firstpage.innerHTML = "first";
  pagediv.append(firstpage);
  firstpage.onclick = function(){
     document.querySelector(".page-div").remove();  //removing existing buttons on clicking on first page button
     if(document.querySelector(".job-list") != null){   // // removing the contents of the page on clicking on first page button
       document.querySelector(".job-list").remove()}
    pagination(1);
  }
  //creating nubers for each button
  for (let i = startidx;i<= +startidx +10;i++){
    const pagebutton = document.createElement("button");
    pagebutton.className= "page-button"
    pagebutton.innerHTML = i;
    pagediv.append(pagebutton);
    if(i == startidx){
      pagebutton.setAttribute("class","clickedpagebutton");
      localStorage.setItem("clickedpage",startidx);
      getjobs();
      }
    pagebutton.onclick = function (){
      if(document.querySelector(".clickedpagebutton") != null){
       // remove the class for previously clicked button and add the class to newly clicked button, to change the color
       document.querySelector(".clickedpagebutton").removeAttribute("class"); 
      }
      pagebutton.setAttribute("class","clickedpagebutton");
      localStorage.setItem("clickedpage",i)
      getjobs();
    }
    
  }
  //creating next button to go for next pages
  const nextbutton = document.createElement("button");
  nextbutton.innerHTML = `${+startidx + 11}-${+startidx + 20}`;  //changing numbers for next button when it is clicked
  if (startidx==89){
   nextbutton.innerHTML = "1-11";
   
  }
  pagediv.append(nextbutton);
  nextbutton.onclick = function () {
   //store the button number of first button in local storage(to access it and change button numbers of all buttons)
    localStorage.setItem("currentindex",startidx);  
    nextitems();
  }
 
  
 document.body.append(pagediv);
 
 function nextitems(){
   var currentindex = localStorage.getItem("currentindex");
   
   if(document.querySelector(".page-div") != null){
    // removing existing buttons when next button is clicked
     document.querySelector(".page-div").remove()}
     if(document.querySelector(".job-list") != null){
       document.querySelector(".job-list").remove()}
       if(currentindex < 89){
   pagination(+currentindex + 11)}   //changing button numbers of all buttons until it reaches last page
   else if (currentindex >= 89){
    //going to first page after it reaches last page
     pagination(1);
   }
  }
 }
 //gets data from api depending on the button number clicked
   async function getjobs() {
       let i = localStorage.getItem("clickedpage");
     const data = await fetch(
       `https://www.themuse.com/api/public/jobs?page=${i}`, //button number is linked to page number
       {
         method: "GET"
       }
     );
     
       try {
         const jobjson = await data.json();  
     const jobs = jobjson.results; //required json data
     loadjobs(jobs); //calling a function to print the data
       }
       // alerts the user if fetching from api fails
       catch {
         alert("please check your connection/ data not available now");
       }
     
     }
 
 
 //loading the data in the page
    function loadjobs(jobs) {
     const jobList = document.createElement("div");
     if(document.querySelector(".job-list")!=null){ //removing existing data
       document.querySelector(".job-list").remove();
      }
     jobList.className = "job-list";
     jobs.forEach((job) => {
       const jobContainer = document.createElement("div"); //container for each job
       jobContainer.className = "job-container";
       //some data is not available in api, set them to unknown
       if(job.locations[0]==undefined){  
         job.locations[0]= "unknown";
         job.locations[0]["name"]= "unknown";
       }
   //creatimg the required data
       jobContainer.innerHTML = `
       <div>
       <div class="job-title">Profile : ${job.name}</div>
       <div class="job-company">Company : ${job.company.name}</div>
       <div class="job-level">Level : ${job.levels[0].name}</div>
       <div class="job-location">location : ${job.locations[0].name}</div>
       <div class="job-type">Type : ${job.type} ${job.model_type}</div>
       <div class="job-created-time" >published date : ${new Date(job.publication_date).toDateString()}</div>
       <a class="job-link" href = "${job.refs.landing_page}"> apply link</a></div>
       `;
      //adding a button to access the description of job
       const toggledescription = document.createElement("button");
       toggledescription.className = "toggle-desc";
       toggledescription.innerHTML = "description";
       const jobdescription = document.createElement("div");
       jobdescription.className = "job-description";
       jobdescription.innerHTML = job.contents;
       jobContainer.append(jobdescription,toggledescription);
      //calling a function when the button is clicked
       toggledescription.onclick = function (){
         if(document.querySelector(".descid") != null){
         document.querySelector(".descid").removeAttribute("class");}
         jobdescription.setAttribute("class","descid");
         toggledesc();
       }
   
       jobList.append(jobContainer);
     });
   
     document.body.append(jobList);
   }
 //toggle between hide/show for job description(when description is clicked)
    function toggledesc() {
     var x =  document.querySelector(".descid")
     if (x.style.display === "none" || x.style.display === "") {
       x.style.display = "block";
     } else {
       x.style.display = "none";
     }
    }
