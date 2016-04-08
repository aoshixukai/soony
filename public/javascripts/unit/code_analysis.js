var Unit = Unit || {}

//代码规则检测结果位置信息
//代码规则检测结果详细信息
//代码规则检测结果项
Unit.AnalysisItem=React.createClass({
	displayName:'Unit.AnalysisItem',
	render:function(){
		return(React.createElement('div',null,this.props.data));
	}
});

//代码规则检测
Unit.Analysis = React.createClass({
    displayName: 'Unit.Analysis',
    render: function() {        
        var commentNodes = this.props.data.map(function(item) {
            return (
                React.createElement(Unit.AnalysisItem, { data: item })
                );
        });
        return (React.createElement('div', null,commentNodes));
    }
});


//代码规则检测初始化
Unit.iniAnalysis = function(elementID,filePath) {
	var data=['1','2','3'];    
    ReactDOM.render(
        React.createElement(Unit.Analysis, {data:data}),
        document.getElementById(elementID)
        );
}