import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import fire from "./fire"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/python';
import 'brace/mode/html';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow';
import 'brace/theme/solarized_light';
import 'brace/theme/solarized_dark';



class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        messageArray :"",
        options : ["javascript","python","html","css"],
        mode : "javascript",
        theme : "tomorrow",
        database : fire.database()
        }
    }

    componentDidMount() {
        this.readMessage();
    }

    readMessage = ()=> {
        this.state.database.ref("/editor").on("value", (message) => {
            var messages = message.val();
          
          this.setState({messageArray : messages})
      });
    }

    sendMessageDatabase = (value)=> {

        this.state.database.ref("/editor").set(value);
    }
      
    changeMode = (mode)=> {
        console.log(mode.value)
        this.setState({mode : mode.value})
        if(mode.value === this.state.options[0]){
            this.setState({theme : "tomorrow", messageArray: "hello"})
        }
        else if(mode.value === this.state.options[1]){
            this.setState({theme : "solarized_dark",messageArray: "hi"})
        }
        else if(mode.value === this.state.options[2]){
            this.setState({theme : "solarized_light", messageArray: "hello"})
        }
        else if(mode.value === this.state.options[3]){
            this.setState({theme : "monokai", messageArray: "hello"})
        }
    }

    render() {
        return(
            <div>
                <Dropdown options={this.state.options} onChange={this.changeMode} value={this.state.mode} placeholder="Select an option" />  
                <AceEditor
                    mode={this.state.mode}
                    theme={this.state.theme}
                    onChange={this.sendMessageDatabase}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                    value={this.state.messageArray}
                />
            </div>
        );
    }
}
export default Editor;
