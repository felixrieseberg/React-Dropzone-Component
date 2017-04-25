import React from 'react';
import ReactDOM from 'react-dom';

import DefaultExample from './example_default.jsx';
import NoPostExample from './example_no_post_url.jsx';
import ParamsExample from './example_params.jsx';
import AutoQueueProcessFalseExample from './example_autoprocessqueue_false.jsx';

// Render

class Examples extends React.Component {
    render() {
        return (
            <div>
                <h2>
                    <a href="https://github.com/felixrieseberg/React-Filepicker">React Filepicker Examples</a>
                </h2>
                <div className="example">
                    <h4>Default Use</h4>
                    <p>This is the default use, posting to the example server.</p>
                    <DefaultExample />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Examples />, document.getElementById('host'));
