import React, { Component } from "react";
import styles from './index.module.scss'

class RightInfoBlock extends Component {
  render() {
    const { portionList } = this.props;
    const milk = portionList.small.milk;
    let keysOfPortion = Object.keys(portionList.small).slice(1);

    if (milk === 0) {
      keysOfPortion = Object.keys(portionList.small).slice(1, 3);
    }

    return (
      <div>
        <div className={styles.rightBlock}>
          {keysOfPortion.map(k => (
            <span>{k} </span>
          ))}
          {Object.values(portionList).map(k => (
            <p>
              <span>{k.water} </span>
              {milk !== 0 ? <span>{k.milk} </span> : <></>}
              <span>{k.coffee} </span>
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default RightInfoBlock;
