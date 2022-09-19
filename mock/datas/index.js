export default {
	friends: function(){
		const friendsList = [
			{
				id: 1,
				name:'peris',
				msg: '听听，你说的那是人话吗？',
				tip: 2,
				imgUrl: '01.jpg',
				time: new Date()
			},
			{
				id: 2,
				name:'jack',
				msg: '但凡与人有关的事，你是一件不干!!!!!',
				tip: 3,
				imgUrl: '02.jpg',
				time: new Date()
			},
			{
				id: 3,
				name:'jess',
				msg: '下路两个孤儿又在送人头了，这年头的孤儿真多',
				tip: 2,
				imgUrl: '03.jpg',
				time: new Date()
			},
			{
				id: 4,
				name:'cheung',
				msg: '东莞，500名望18-24词条，求老哥带飞!!!!!!!!!!!',
				tip: 2,
				imgUrl: '04.jpg',
				time: new Date()
			},
			{
				id: 5,
				name:'peter',
				msg: '听听，你说的那是人话吗？听听，你说的那是人话吗?',
				tip: 2,
				imgUrl: '05.jpg',
				time: new Date()
			}
		]
		return friendsList
	}
}