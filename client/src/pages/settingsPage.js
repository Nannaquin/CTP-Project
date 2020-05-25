import React, { 
    Component, 
} from 'react';

import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import Button from 'react-bootstrap/Button';
import '../css/saved.css';


export default class settingsPage extends Component {
        
    state = {
        Loggedin: true,
        loading: false,  
        goBack: false, 
    }

    render() {
        
        if(this.state.loading) return <Loading />;
        if(this.state.Loggedin === false) return <Redirect to="/login" />  // Safety Pre-Caution against hackers! ;)
        if(this.state.goBack) return <Redirect to="/dashboard" />

        return (
            <div>
                
                <section>
                    side bar
                    
                    <div className="container-fluid justify-content-center text-white">
                        <div className="row mb-4 py-3">
                          Top Bar
                        </div>
                        <div className="row comingSoonBanners">
                            <div className="col-xl-10 col-lg-9 col-md-8 py-2 mt-4 bg-danger shadow-lg">
                                <h1 className="mt-auto mb-4">Coming Soon</h1>
                                <Button type="submit" onClick={ () => this.setState( {goBack: true} ) } className="mt-4" >Go back to dashboard </Button>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}


