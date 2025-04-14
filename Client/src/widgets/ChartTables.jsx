import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Toolbar, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { orderDetails } from '@/data/sampleData';
const ChartTables = () => {
    const filterSettings = { type: 'Excel' };
    const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const customeridRule = { required: true, minLength: 5 };
    const orderidRules = { required: true, number: true };
    const freightRules = { required: true, min: 0 };
    return (<div className='control-pane'>
      <div className='control-section'>
        <GridComponent dataSource={orderDetails} height='350' allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar}>
          <ColumnsDirective>
            <ColumnDirective field='OrderID' headerText='Order ID' width='180' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={customeridRule}></ColumnDirective>
            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'/>
            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={freightRules} editType='numericedit'/>
            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'></ColumnDirective>
            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Sort, Toolbar, Filter, Edit]}/>
        </GridComponent>
      </div>
    </div>);
}

export default ChartTables