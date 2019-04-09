const graphql = require('graphql');
const Contacts = require('../models/contact-details');
const Site = require('../models/site-details');

const {GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList, 
	GraphQLNonNull		
	} = graphql;

/*static findBySiteId(siteId) {
    return this.findOne({ siteId });
  }*/

const ContactType = new GraphQLObjectType({
	name:'Contacts',
	fields:()=>({
		id: {type:GraphQLID},
		name:{type:GraphQLString},
		role:{type:GraphQLString},
		organization:{type:GraphQLString},
		email:{type:GraphQLString},
		phone:{type:GraphQLString},
		remark:{type:GraphQLString},
		status:{type:GraphQLString},
		site:{
			type:SiteType,
			resolve(parent,args)
			{
				return Site.findById(parent.siteId);
			}
		}

	})
});

const SiteType = new GraphQLObjectType({
	name:'Site',
	fields:()=>({

		id:{type:GraphQLID},
		sid:{type:GraphQLString},
		name:{type:GraphQLString},
		city:{type:GraphQLString},
		state:{type:GraphQLString},
		country:{type:GraphQLString},
		contacts:{
			type:new GraphQLList(ContactType),
			resolve(parent,args)
			{
				console.log(parent);
				return Contacts.find({siteId:parent.sid});
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields:{
		contact:{
			type:ContactType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				console.log(typeof(args.id));
				return Contacts.findById(args.id);
			}
		},
		site:{
			type:SiteType,
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				//$d = args.id;
				console.log(typeof(args.sid));
				//console.log(findBySiteId(args.sid));
				return Site.findBySite(args.sid);
			}
		},
		sites:{
			type:new GraphQLList(SiteType),
			resolve(parent,args)
			{
				return Site.find({});
			}
		}

	}
});

const Mutation = new GraphQLObjectType({
	name:'Mutation',
	fields:{
		addSite:{
			type:SiteType,
			args:{
				name:{type:GraphQLString},
				city:{type:GraphQLString},
				state:{type:GraphQLString},
				country:{type:GraphQLString},
				sid:{type:GraphQLString}
			},
			resolve(parent,args)
			{
			let site = new Site({
				name:args.name,
				city:args.city,
				state:args.state,
				country:args.country,
				sid:args.sid
			});
			return site.save();
			}
		},
		addContacts:{
			type:ContactType,
			args:{
				name:{type:new GraphQLNonNull(GraphQLString)},
				role:{type:new GraphQLNonNull(GraphQLString)},
				organization:{type:new GraphQLNonNull(GraphQLString)},
				email:{type:GraphQLString},
				phone:{type:GraphQLString},
				remark:{type:GraphQLString},
				status:{type:GraphQLString},
				siteId:{type:GraphQLID}
				
			},
			resolve(parent,args)
			{
				let contacts = new Contacts({
					name:args.name,
					role:args.role,
					organization:args.organization,
					email:args.email,
					phone:args.phone,
					remark:args.remark,
					status:args.status,
					siteId:args.siteId
				});
				return contacts.save();
			}
		}
		
	}
}) ;


module.exports = new GraphQLSchema({

	query:RootQuery,
	mutation:Mutation
});