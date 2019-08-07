import React, { Component } from "react";

class RightInfoBlock extends Component {
    render() {
        const {portionList} = this.props;

        return (
          <div>
            <div className="rightBlock">

              {Object.keys(portionList.portionWaterList).map((key,index) =>
                  (
                    <span key={index} >
                      {key}{"  "}
                    </span>
                  )
              )}
              <br/>


              {Object.values(portionList).map((key,index) =>
                  (<div key={index}>
                      {Object.values(key).map((key1,index1)=> (
                          key1!==0?
                          <span key={index1}>{key1}{"  "}</span>: <></>)
                      )
                      }
                      <br/>
                  </div>)
              )}
            </div>
          </div>
        );
    }
}

export default RightInfoBlock;
