function generateMarkdown(data) {
  return  `
  # ${data.title}  

  ## Author Info:  
  ![Profile Picture](${data.profile})  
  Email: ${data.email}  

  ## Project Description:   
  ${data.description}  

  ## Table of contents:  
  [Installation](#installation)  
  [Usage](#usage)  
  [Tests](#tests)  
  [Contributing](#contributing)  
  [License](#license)  

  ## Installation:<a id=installation></a>   
  ${data.install}  

  ## Usage:<a id=usage></a>  
  ${data.use}  

  ## Tests:<a id=tests></a>  
  ${data.tests}  

  ## Contributing:<a id=contributing></a>  
  ${data.contribute}  

  ## License:<a id=license></a>  
  ${data.license}
  `;
}

module.exports = generateMarkdown;
