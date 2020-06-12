import React from 'react';
var Board = (props, onClick)=>{
  return(
    <table >
      <tbody>
      {
        props.board.map((row,id)=>
        <tr key = {id} className = "row">
        {row.map((col, id2)=>
        <td key = {id2} className = 'col' onClick={()=>props.onClick(id,id2)}>
          {col}
        </td>)}

        </tr>)}
      </tbody>

    </table>
  )
}

export default Board;