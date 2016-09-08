import React from 'react';
import ReactDOM from 'react-dom';

import DefaultExample from './example_default.jsx';
import NoPostExample from './example_no_post_url.jsx';
import ParamsExample from './example_params.jsx';

// Render

class Examples extends React.Component {
    render() {
        console.log(DefaultExample);
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
                <div className="example">
                    <h4>Use without url</h4>
                    <p>Neither <code>url</code> nor a form <code>action</code> parameter are specified, meaning that you can completely customize this component.
                    Check the console for a log of each added file!</p>
                    <NoPostExample />
                </div>
                <div className="example">
                    <h4>Use with custom parameters</h4>
                    <p>This example simply showcases how one would use the component with custom POST parameters, for instance for authentication.</p>
                    <ParamsExample />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Examples />, document.getElementById('host'));