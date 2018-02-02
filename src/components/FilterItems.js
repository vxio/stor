import React from 'react'
import ItemGrid from './ItemGrid';

const FilterItems = (props) => {
    const {items} = props;
  return (
    <div>
     <ItemGrid items={items}></ItemGrid>  
    </div>
  )
}

export default FilterItems
