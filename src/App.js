import React, {Component} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import './App.css'

export const downloadFile = (data) => {
    let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    let link = document.createElement('a');
    link.download = `file.docx`;
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {data: {}}
    }

    render() {
        return (
            <div className="App">
                <div className="right-block">
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    config={{
                        language: 'ru',
                        toolbar: ['heading', '|',
                            'fontfamily', 'fontsize', '|',
                            'alignment', '|',
                            'fontColor', 'fontBackgroundColor', '|',
                            'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                            'link', '|',
                            'outdent', 'indent', '|',
                            'bulletedList', 'numberedList', 'todoList', '|',
                            'code', 'codeBlock', '|',
                            'insertTable', '|',
                            'uploadImage', 'blockQuote', '|',
                            'undo', 'redo' ]
                    }}
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={editor => {
                        const data = editor.getData();
                        this.setState({data: data})
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        this.setState({data: data})
                    }}
                    onBlur={(event, editor) => {
                        // console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        // console.log('Focus.', editor);
                    }}
                />
                <br/>
                <button onClick={() => {
                    let url = new URL("http://localhost:8080/convert");
                    console.log(this.state.data)
                    fetch(url, {
                        method: 'POST',
                        body: '<body>' + this.state.data + '</body>'
                    })
                        .then(response => {
                            if (response.ok) {
                                response.blob().then(r => downloadFile(r))
                            }
                        })
                        .catch(e => console.log(e));
                }}>Сохранить
                </button>
            </div>
            </div>
        );
    }
}

export default App;