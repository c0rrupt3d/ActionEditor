import React, {useState, useRef} from 'react';
import {Editor, EditorState, ContentState, convertToRaw, convertFromRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';

import ReactTooltip from 'react-tooltip';

import "./texteditor.css";
import Logo from "../img/logo.png";

import ClearImg from "../img/clear.png";
import UndoImg from "../img/undo.png";
import RedoImg from "../img/redo.png";
import UploadImg from "../img/upload.png";
import SaveImg from "../img/save.png";
import TranslateImg from "../img/translate.png";
import DownloadImg from "../img/download.png";
import LoadingImg from "../img/loading.png"

import firebase from "../utils/firedb"

function TextEditor() {
    function currentContent(){
        const localContent = window.localStorage.getItem("rawContent");

        if(localContent){
            return (EditorState.createWithContent(convertFromRaw(JSON.parse(localContent))))
        }
        else{
            return (EditorState.createEmpty())
        }
        
    }

    const [editorState, setEditorState] = useState(
        currentContent()
      );

      const [charCount, setCharCount] = useState(0);
      const [wordCount, setWordCount] = useState(0);
      const [uploadLoad, setUploadLoad] = useState(false);
      const [downloadLoad, setDownloadLoad] = useState(false);
      
    const editor = useRef(null);
    function focusEditor() {
    editor.current.focus();
    }

    const updateEditor = (e) => {
        setEditorState(e); 

        const content = e.getCurrentContent();
        const text = content.getPlainText();

        setCharCount(text.length);
        const  s = text;

        let spaces = s.match(/\S+/g);
        let words = spaces ? spaces.length : 0

        setWordCount(words)

        
    }

    const clearAction = () => {
        const editorClear = EditorState.push(editorState, ContentState.createFromText(""))
        setEditorState(editorClear)
        setCharCount(0);
        setWordCount(0);
        window.localStorage.clear()
        
    }

    const undoAction = () => {
        setEditorState(EditorState.undo(editorState));
    }

    const redoAction = () => {
        setEditorState(EditorState.redo(editorState));
    }

    const saveLocal = () => {
        const content = editorState.getCurrentContent();
        const text = content.getPlainText();

        if(text.length > 0){
            const rawContent = convertToRaw(content);
            window.localStorage.setItem("rawContent", JSON.stringify(rawContent));
            alert(" ✔️ Data saved locally!")
        }
        else{
            alert("⚠️ TextArea is empty.")
        }

    }

    const uploadServer = () => {
        setUploadLoad(true)
        const content = editorState.getCurrentContent();
        const text = content.getPlainText();
        const rawContent = convertToRaw(content);

        const rawUpload = JSON.stringify(rawContent);

        const uploadRef = firebase.database().ref("plainText")
        const upload = {
            rawUpload,
        };
        if(text.length > 0){
            uploadRef.set(upload , error => {
                if(error){
                    alert(" ⚠️ Data could not be saved" + error)
                    setUploadLoad(false)
                }
                else{
                    alert(" ✔️ Data uploaded successfully!")
                    setUploadLoad(false)
                }
            });
        }
        else{
            alert("⚠️ TextArea is empty.")
            setUploadLoad(false)
        }
    }

    const downloadServer = () => {
        setDownloadLoad(true)

        const downloadRef = firebase.database().ref("plainText");

        downloadRef.on("value", function(snapshot){
               let db = snapshot.val();
               if(db === null){
                alert("⚠️ No data stored! Store some data first.")
                setDownloadLoad(false)
               }
               else{
                let rawDownload = db["rawUpload"]

                if(rawDownload){
                    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(rawDownload))))
                    // alert("✔️ Data loaded from server!")
                    setDownloadLoad(false)
                   }
                   else{
                    alert("⚠️ No data stored.")
                    setDownloadLoad(false)
                   }
                }
               })           
    }

    return (
        
        <div className="editor-div">
            <div className="logo-container" >
                <p>ACTION EDITOR</p>
                
                <img src={Logo}/>
                
            </div>
            <div className="editor-buttons-top">
                <button 
                data-tip="Undo" 
                className="button" 
                onClick={undoAction}> 
                <img alt="Undo" src={UndoImg} width="100%" height="100%"/>
                </button>
                
                <button 
                data-tip="Redo" 
                className="button" 
                onClick={redoAction} 
                style={{marginLeft:"10px"}}> 
                <img alt="Redo" src={RedoImg} width="100%" height="100%"/>
                </button>

                <button 
                data-tip="Clear" 
                className="button" onClick={clearAction} 
                style={{marginLeft: "auto"}}> 
                <img alt="Clear" src={ClearImg} width="100%" height="100%"/>
                </button>

            </div>
        <div className="editor-container"
        onClick={focusEditor}>
        
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={ e =>{updateEditor(e)}}
        placeholder="Type here..."
      />

    </div>
    <div className="char-word-counter">
        <p>Characters: {charCount} <br/> Words: {wordCount}</p>
    </div>
    <div className="editor-buttons-bottom">
                <button 
                disabled={true}
                data-tip="Translate to Hindi (disabled)" 
                className="button" style={{marginRight: "auto"}}> 
                <img alt="Tranlate" src={TranslateImg} width="100%" height="100%"/>
                </button>
                
                <button 
                onClick={saveLocal} 
                data-tip="Save draft locally" 
                className="button" 
                style={{marginRight: "10px"}}> 
                <img alt="Save" src={SaveImg} width="100%" height="100%"/>
                </button>

                <button 
                onClick={uploadServer} 
                data-tip="Upload draft to Server" 
                className="button">  
                {uploadLoad ? 
                <img alt="Loading" className="loading-anim" src={LoadingImg} width="100%" height="100%"/> 
                : <img alt="Upload" src={UploadImg} width="100%" height="100%"/>}
                </button>

                <button 
                onClick={downloadServer} 
                data-tip="Download draft from Server" 
                className="button"
                style={{marginLeft:"10px"}}> 
                {downloadLoad ? 
                <img alt="Loading" className="loading-anim" src={LoadingImg} width="100%" height="100%"/> 
                : <img alt="Download" src={DownloadImg} width="100%" height="100%"/>}
                </button>
    </div>
    <ReactTooltip
        place="bottom"
        delayShow="350"
        effect="solid"
        className="tooltip"
    />
    </div>
    )
}

export default TextEditor
