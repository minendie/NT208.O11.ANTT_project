import '../App.css';
import '../component/AITool/styles.css';
import { Component } from 'react';
import DropZone from '../component/AITool/DropZone';
import AIToolResultLeft from '../component/AITool/AIToolResultLeft';
import AIToolResultRight from '../component/AITool/AIToolResultRight';


// declare props for AITool component
interface AIToolProps {

}

// declare states for AITool component
interface AIToolState {
  filename: string, 
  prediction: any,
  message?: string,
  isInfo: boolean,
  answer: string,
}

export class AITool extends Component<AIToolProps, AIToolState> {
  constructor(props: AIToolProps) {
      super(props);

      this.state = {
        filename: '',
        prediction: '',
        message: '',
        isInfo: true,
        answer: '',
      };
  }
  // // <Future> auto retrieve answers from the Internet
  // fetchAnswer = async () => {
  //   try {
  //     const response = await axios.post('https://api.openai.com/v1/engines/poe/completions', {
  //       prompt: `Describe ${this.state.prediction.name} in 50-100 words`,
  //       max_tokens: 50
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer ${apiKey}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     const answerText = response.data.choices[0].text.trim();
  //     this.setState({
  //       answer: answerText,
  //     });
  //     console.log(`POE Answer: ${answerText}`);
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //   }
  // };


  // get the data returned by AI Tool API
  getPOSTData = (childData: any) => {
    this.setState({
      filename: childData.filename,
      prediction: childData.prediction, // an object 
    });
    // this.fetchAnswer(); // retrieve answers
  };

  changeToSearchByTrashTag = (childData: any) => {
    this.setState({
      isInfo: childData.isInfo,
    })
  };

  render() {
      return  (
        <div className='AITool'>
          { 
            this.state.filename  // if receive an image
              ? ( // display image and result
                <>
                  <AIToolResultLeft 
                    filename={this.state.filename} 
                    label={this.state.prediction.name}
                    readState={this.changeToSearchByTrashTag}
                  />
                  <AIToolResultRight 
                    isInfo={this.state.isInfo} 
                    prediction={this.state.prediction}
                  />
                </>
              ) 
              : ( // display drag and drop file by default
                <>
                  <DropZone sendData={this.getPOSTData} />
                  <div className='AITool-content'>
                    <div className='AITool-header'>
                      <img className='AITool-header-logo' src='https://greendots-aitool-server.onrender.com/image/AI_Tool_logo.svg' />
                      <h1 className='AITool-header-title'>AI-powered waste sorting tool</h1>
                    </div>
                    <p className='AITool-desc'>An AI-powered waste sorting tool utilizes advanced algorithms and machine learning to automate and optimize the process of waste classification.</p>
                  </div>
                </>
              )
          }
        </div>
    )
  }
}


export default AITool;
