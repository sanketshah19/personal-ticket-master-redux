import React from 'react'
import { Chart } from 'react-google-charts';

class Charts extends React.Component{

    render(){
        const deptData = [['Department', 'High', 'Medium', 'Low']]
        this.props.departments.forEach(dept => {
            const highCount = this.props.tickets.filter(tckt=>tckt.department===dept._id && tckt.priority==='High').length
            const mediumCount = this.props.tickets.filter(tckt=>tckt.department===dept._id && tckt.priority==='Medium').length
            const lowCount = this.props.tickets.filter(tckt=>tckt.department===dept._id && tckt.priority==='Low').length
            deptData.push([dept.name, highCount, mediumCount, lowCount])
        })

        return(
            <div className="mt-3 mb-3">
                <div className="row">
                   <div className="col-md-8 mx-auto">
                    <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<h2>Loading Chart</h2>}
                            data={[
                                ['Priority','Count'],
                                ['High', this.props.tickets.filter(item=>item.priority==='High').length],
                                ['Medium', this.props.tickets.filter(item=>item.priority==='Medium').length],
                                ['Low', this.props.tickets.filter(item=>item.priority==='Low').length]
                            ]}
                            options={{title: "Tickets Priority %",
                            pieHole: 0.4,
                            is3D: true
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                   </div>
                   <div className="col-md-8 mx-auto">
                    <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="Bar"
                            loader={<h2>Loading Chart</h2>}
                            data={deptData}
                            options={{
                                chart: {
                                title: 'Tickets by Department',
                                subtitle: 'Priority: High, Medium and Low',
                                },
                            }}
                            rootProps={{ 'data-testid': '2' }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default Charts