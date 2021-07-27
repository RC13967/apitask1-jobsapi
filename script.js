function pagination (startidx){
 const pagediv =  document.createElement("div");
 pagediv.className = "page-div";
 const firstpage = document.createElement("button");
 firstpage.innerHTML = "first";
 pagediv.append(firstpage);
 firstpage.onclick = function(){
    document.querySelector(".page-div").remove();
    if(document.querySelector(".job-list") != null){
      document.querySelector(".job-list").remove()}
   pagination(1);
 }
 for (let i = +startidx;i<= +startidx +10;i++){
   const pagebutton = document.createElement("button");
   pagebutton.className= "page-button"
   pagebutton.innerHTML = i;
  
   pagediv.append(pagebutton);
   pagebutton.onclick = function (){
     if(document.querySelector(".clickedpagebutton") != null){
      document.querySelector(".clickedpagebutton").removeAttribute("class");
     }
     pagebutton.setAttribute("class","clickedpagebutton");
     localStorage.setItem("clickedpage",i)
     getjobs();
   }
   
 }
 const nextbutton = document.createElement("button");
 nextbutton.innerHTML = `${+startidx + 11}-${+startidx + 20}`;
 if (startidx==89){
  nextbutton.innerHTML = "1-11";
  
 }
 pagediv.append(nextbutton);
 nextbutton.onclick = function () {
   localStorage.setItem("currentindex",startidx);
   nextitems();
 }

 
document.body.append(pagediv);
}

function nextitems(){
  var currentindex = localStorage.getItem("currentindex");
  
  if(document.querySelector(".page-div") != null){
    document.querySelector(".page-div").remove()}
    if(document.querySelector(".job-list") != null){
      document.querySelector(".job-list").remove()}
      if(currentindex < 89){
  pagination(+currentindex + 11)}
  else if (currentindex >= 89){
    pagination(1);
  }

}

  async function getjobs() {
    
      let i = localStorage.getItem("clickedpage");
    
   
    
    const data = await fetch(
      `https://www.themuse.com/api/public/jobs?page=${i}`,
      {
        method: "GET"
      }
    );
    
      try{
        const jobjson = await data.json();
    const jobs = jobjson.results;
    loadjobs(jobs);
    console.log(jobs[0]);
      }
      catch{
        alert("check your connection");
      }
    
    }



   function loadjobs(jobs) {
    const jobList = document.createElement("div");
    if(document.querySelector(".job-list")!=null){
      document.querySelector(".job-list").remove();
     }
    jobList.className = "job-list";
    jobs.forEach((job) => {
      const jobContainer = document.createElement("div");
      jobContainer.className = "job-container";
      if(job.locations[0]==undefined){
        job.locations[0].name = "unknown";
      }
  
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
      const toggledescription = document.createElement("button");
      toggledescription.className = "toggle-desc";
      toggledescription.innerHTML = "description";
      const jobdescription = document.createElement("div");
      jobdescription.className = "job-description";
      jobdescription.innerHTML = job.contents;
      jobContainer.append(jobdescription,toggledescription);
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
   function toggledesc() {
    var x =  document.querySelector(".descid")
    if (x.style.display === "none" || x.style.display === "") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
   }
  
 
