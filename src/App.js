import React, {Component} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'


class App extends Component {
    render() {
        return (
            <div className="App">
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={BalloonEditor}
                    data="<p>Type Your Text</p>"
                    onReady={() => {
                        // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log( {event, editor,  data});
                    }}
                    config={{
                        toolbar: {
                            items: [
                                'heading',
                                '|',
                                'bold',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',
                                '|',
                                '|',
                                'imageUpload',
                                'blockQuote',
                                'insertTable',
                                'mediaEmbed',
                                'undo',
                                'redo',
                                'alignment',
                                'fontSize',
                                'highlight'
                            ]
                        },
                        language: 'ru',
                        image: {
                            toolbar: [
                                'imageTextAlternative',
                                'imageStyle:full',
                                'imageStyle:side'
                            ]
                        },
                        table: {
                            contentToolbar: [
                                'tableColumn',
                                'tableRow',
                                'mergeTableCells'
                            ]
                        }
                    }}
                />
            </div>
        );
    }
}

export default App;