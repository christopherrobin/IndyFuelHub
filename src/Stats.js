import React, { useState, useEffect } from "react";
import _ from 'lodash';

const Stats = () => {
  const [hasError, setErrors] = useState(false);
  const [stats, setStats] = useState({});

  async function fetchData() {
    const res = await fetch("https://cors-anywhere.herokuapp.com/https://www.echl.com/api/s3?q=statistics-players-forwards.json");
    res
      .json()
      .then(res => setStats(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  });

  const test = _.get(stats, 'data');
  // const test2 = () => _.forEach(test, function(value) {return value.lastName});
  // const firstNames = () => test;
  const firstNames = _.forEach(test, function(value, key) {
          console.log(value.lastName);
        })

  if(!hasError && test){
    return (
      <div>
        <span>
        {
          {firstNames}
/*         _.forEach(test, function(value, key) {
          return <p>{value.lastName}</p>
        })
 */        }
        </span>
        <span>{
          JSON.stringify(
            // _.map(_.get(test, 'firstName'))
            // console.log(test)
          )
        }</span>
      </div>
    );
  } else {return null}
};
export default (Stats);
