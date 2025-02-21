

const loadAITools = async (isSeeMore) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  const tools = data.data.tools
  displayAITools(tools, isSeeMore)
}

const displayAITools = (tools, isSeeMore) => {

  console.log(isSeeMore)

  const toolsContainer = document.getElementById('tools-container');
  toolsContainer.textContent = '';

  const seeMoreContainer = document.getElementById('see-more-container');

  if (tools.length > 6 && !isSeeMore) {
    tools = tools.slice(0, 6);
    seeMoreContainer.classList.remove('hidden')
  }else{
    seeMoreContainer.classList.add('hidden')
  }


  for (const tool of tools) {
    // console.log(tool)
    const toolCard = document.createElement('div');
    toolCard.classList = 'card card-compact px-4 py-8 bg-base-100 shadow-xl border';
    toolCard.innerHTML = `
      <figure class="p-6">
            <img class="rounded-xl" src="${tool.image}" alt="${tool.name}" />
          </figure>
          <div class="card-body">
            <p>${tool.description}</p>
            <div>
            <h2 class="text-xl text-black font-bold">Features</h2>
            <ul>
              <li>1. ${tool.features[0]}</li>
              <li>2. ${tool.features[1]}</li>
              <li>3. ${tool.features[2]}</li>
            </ul>
            </div>
            <div class="flex justify-between">
               <div>
                <h2 class="card-title">${tool.name}</h2>
                <p>
                <i class="fa-solid fa-calendar-days"> </i> &nbsp
               ${tool.published_in}</p>
               </div>
               <div>
                  <button onclick="detailsAI('${tool.id}')" class="btn rounded-full bg-[#FEF7F7]"><i class="fa-solid fa-arrow-right"></i></button>
               </div>
            </div>

          </div>
    `;
    toolsContainer.appendChild(toolCard)

  }
}

const detailsAI = async(id) =>{
  // console.log(id)
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  const data = await res.json();
  const toolDetails = data.data;
  displayAIDetails(toolDetails);
  
}

const displayAIDetails = (toolDetails) => {
  console.log(toolDetails)

  const detailsAIContainer = document.getElementById('details_AI_Container');

  detailsAIContainer.innerHTML = `
    <div id="left-container" class= "bg-red-50 border border-red-200 rounded-xl p-6 w-1/2">
        <h4 class="text-lg font-bold">${toolDetails.description}</h4>
        <div class="flex gap-2 my-2">
          <div class="grid place-items-center p-2 bg-white rounded-xl text-center text-green-600">
            ${toolDetails?.pricing?.[0]?.price} <br/> ${toolDetails?.pricing?.[0]?.plan}
          </div>
          <div class="grid place-items-center p-2 bg-white rounded-xl text-center text-yellow-500">
            ${toolDetails?.pricing?.[1]?.price} <br/> ${toolDetails?.pricing?.[1]?.plan}
          </div>
          <div class="grid place-items-center p-2 bg-white rounded-xl text-center text-red-600">
            ${toolDetails?.pricing?.[2]?.price} <br/> ${toolDetails?.pricing?.[2]?.plan}
          </div>
        </div>

        <div class="flex justify-between">
          <div>
            <h2 class="font-bold text-xl">Features</h2>
            <ul class="list-disc pl-5">
              <li>${toolDetails?.features?.[1]?.feature_name}</li>
              <li>${toolDetails?.features?.[2]?.feature_name}</li>
              <li>${toolDetails?.features?.[3]?.feature_name}</li>
            </ul>
          </div>

          <div>
            <h2 class="font-bold text-xl">Integration</h2>
            <ul class="list-disc pl-5">
              <li>${toolDetails?.integrations?.[0]}</li>
              <li>${toolDetails?.integrations?.[1]}</li>
              <li>${toolDetails?.integrations?.[2]}</li>
            </ul>
          </div>
        </div>
    </div>

    <div id="right-container" class="border rounded-xl p-6 w-1/2">
      <figure class="flex mb-3">
        <img class="rounded-xl" src="${toolDetails.image_link[0]}"/>
      </figure>

      <h4 class="text-xl font-bold my-3">${toolDetails?.input_output_examples?.[0]?.input}</h4>
      <p>${toolDetails?.input_output_examples[0]?.output}</p>
    </div>

    
  `;

  details_AI.showModal()
}

const handleSeeMore = () =>{
  loadAITools(true)
}

loadAITools()