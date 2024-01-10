import React, { Component } from 'react';
import { createApi } from "unsplash-js"
import fetch from "node-fetch"


export class Home extends Component {

    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            name: 'ImageSearcher',
            searchText: '',
            resultImages: []
        }
    }

  render() {
      return (
          <>
              <h1>{this.state.name}</h1>
              <div className="input-group mb-3">
                  <input onChange={(e) => this.onSearchTextChange(e, this)} type="text" className="form-control" placeholder="Görsel Ara"></input>
                  <span onClick={() => this.searchImage(this.state)} className="input-group-text" role="button" id="basic-addon1">Ara</span>
              </div>
              <div className="bd-example m-0 border-0">
                  {this.state.resultImages.map(function (resultI, i) {
                      return (<a target="_blank" href={resultI.urls.full}><img key={resultI.id} src={resultI.urls.small} class="img-thumbnail"></img></a>);
                  })}
              </div>
          </>
        );
    }

    onSearchTextChange(event, stateProp) {
        stateProp.setState({
            searchText: event.target.value
        })
    }

    searchImage(currentState) {
        if (currentState.searchText.length < 1) {
            window.alert("Görsel Aramaya Bir şeyler yazın");
            return false;
        }

        if (currentState.searchText.length > 0) {

            const unsplash = createApi({
                accessKey: 'knKCWJU-aMuZM1xxj64fpmGG5b8Yv2ACPNstB7Q4JuY',
            });

            unsplash.search.getPhotos({
                query: currentState.searchText,
                page: 1,
                perPage: 10,
                color: 'green',
                orientation: 'portrait',
            }).then(result => {
                if (result.status == 200) {
                    this.setImageResult(result);
                }
            });


            
        }
    }

    setImageResult(result) {
        console.log(result)

        if (result.response.results.length == 0) {
            window.alert(this.state.searchText + " aramasıyla herhangi bir sonuç bulunamadı!");

            let searchInput = document.querySelector("#root > div > main > div.input-group.mb-3 > input");

            searchInput.value = "";
            searchInput.focus();
            

            return false;
        }

        this.setState({
            resultImages: result.response.results
        });
    }

}
