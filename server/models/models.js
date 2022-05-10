const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const getISODate = require ('../utils/dates/getISODate');

const id = {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true};
const money = {type: DataTypes.DECIMAL(10, 2), allowNull: false};

const Jurisdiction = sequelize.define('jurisdiction', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Organizations = sequelize.define('organizations', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    short: {type: DataTypes.STRING, },
    requisits: {type: DataTypes.TEXT, unique: true},
    INN: {type: DataTypes.INTEGER, unique: true, allowNull: false},
    KPP: {type: DataTypes.INTEGER, unique: true},
    house: {type: DataTypes.INTEGER, allowNull:false},
    flat: {type: DataTypes.INTEGER},
    block: {type: DataTypes.INTEGER},
    createdAt: {type: DataTypes.DATEONLY, allowNull: false, get(){
        const val = this.getDataValue('createdAt')
        if(val) return val.toLocaleString('ru-RU').substring(0, 10)
        return val;
    }}
})

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "user", allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    position: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique:true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    is_online: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    phone_number: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING}
})

const Messages = sequelize.define('messages', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    date: {type: DataTypes.DATEONLY, allowNull: false},
    time: {type: DataTypes.TIME, allowNull: false},
    text: {type: DataTypes.STRING},
})
const Debtors = sequelize.define('debtors', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING},
    birth_date: {type: DataTypes.DATEONLY},
    birth_place: {type: DataTypes.STRING},
    house: {type: DataTypes.INTEGER, allowNull:false},
    flat: {type: DataTypes.INTEGER},
    block: {type: DataTypes.INTEGER},
})
const Contracts = sequelize.define('contracts', {
    id,
    name: {type: DataTypes.STRING},
    number: {type: DataTypes.STRING},
    sum_issue: {type: DataTypes.DECIMAL(10,2), allowNull: false},
    date_issue: {type: DataTypes.DATEONLY},
    due_date: {type: DataTypes.DATEONLY},
    percent: {type: DataTypes.DECIMAL(5,2)},
    penalty: {type: DataTypes.DECIMAL(5,2)},
    statusChanged: {type: DataTypes.DATEONLY},
    statusId: {type: DataTypes.INTEGER, allowNull: false, set(val){
        const now = getISODate();
        this.setDataValue('statusChanged', now);
        this.setDataValue('statusId', val);
    }},
    createdAt: {type: DataTypes.DATEONLY, allowNull: false, get(){
        const val = this.getDataValue('createdAt')
        if(val) return val.toLocaleString('ru-RU').substring(0, 10)
        return val;
    }}
    })
const Payments = sequelize.define('payments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    sum: {type: DataTypes.DECIMAL(10,2), allowNull: false },
    percents: {type: DataTypes.DECIMAL(10,2), },
    penalties: {type: DataTypes.DECIMAL(10,2), defaultValue: 0},
    main: {type: DataTypes.DECIMAL(10,2), defaultValue: 0},
    date: {type:DataTypes.DATEONLY, allowNull: false}  
})

const Passports = sequelize.define('passports', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false, defaultValue: 'RF'},
    series: {type: DataTypes.STRING, allowNull: false},
    number: {type: DataTypes.STRING, allowNull: false},
    issued_by: {type: DataTypes.STRING, allowNull: false},
    issued_date: {type: DataTypes.DATEONLY, allowNull: false},
    gov_unit_code: {type: DataTypes.STRING, allowNull: false}
})

const Courts = sequelize.define('courts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull:false, unique: true},
    house: {type: DataTypes.INTEGER, allowNull: false},
    block: {type: DataTypes.STRING}
})

const OrgTable = sequelize.define('org_table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}) 
const OrgTypes = sequelize.define('org_types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull:false},
}, {timestamps:false})


const Regions = sequelize.define('regions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
})
const Cities = sequelize.define('cities', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
})
const Streets = sequelize.define('streets', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
})
const Areas = sequelize.define('areas', {
    id,
    name: {type: DataTypes.STRING, allowNull: false},
})
const RegionTypes = sequelize.define('region_types', {
    id,
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const HouseTypes = sequelize.define('house_types', {
    id,
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const FlatTypes = sequelize.define('flat_types', {
    id,
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const CityTypes = sequelize.define('city_types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const StreetTypes = sequelize.define('street_types', {
    id, 
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const Cessions = sequelize.define('cessions', {
    id,
    name: {type: DataTypes.STRING},
    transferDate: {type: DataTypes.DATEONLY, allowNull: false, },
    cessionSum: {type: DataTypes.DECIMAL},
    number: {type: DataTypes.STRING},
    text: {type: DataTypes.TEXT},
    document: {type: DataTypes.TEXT}
})
const Statuses = sequelize.define('statuses', {
    id,
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, {timestamps: false});
const ContractTypes = sequelize.define('contract_types', {
    id,
    name: {type: DataTypes.STRING, unique: true, allowNull: false},

},
{timestamps:false}
)
const CourtTypes = sequelize.define('court_types', {
    id,
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
},
{timestamps:false}
);
const CourtLevels = sequelize.define('court_levels', {
    id,
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
},
{timestamps:false}
);
const BlockTypes = sequelize.define('block_types', {
    id,
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
},
{timestamps:false}
);
const Actions = sequelize.define('actions', {
    id,
    result: {type: DataTypes.TEXT, allowNull: false}, 
    createdAt: {type: DataTypes.DATE, allowNull: false, get(){
        return this.getDataValue('createdAt')
        .toLocaleString('ru-RU');
    }}
})
const ActionTypes = sequelize.define('actionTypes', {
    id,
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, {timestamps: false})
const ActionObjects = sequelize.define('actionObjects', {
    id,
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, {timestamps: false});

const Tokens = sequelize.define('tokens', {
    id,
    token: {type: DataTypes.STRING, allowNull: false}
}, {timestamps: false});

const Tasks = sequelize.define('tasks', {
    id,
    name: {type: DataTypes.STRING, allowNull: false},
    time: {type: DataTypes.DATE, allowNull: false, get(){
        return this.getDataValue('time')
        .toLocaleString('ru-RU');
    }},
    description: {type: DataTypes.TEXT, allowNull: false},
    isImportant: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    createdAt: {type: DataTypes.DATE, allowNull: false, get(){
        return this.getDataValue('createdAt')
        .toLocaleString('ru-RU');
    }}
})
const UsersinTask = sequelize.define('usersInTask', {
    id
}, {timestamps:false});

const Groups = sequelize.define('groups', {
    id,
    name: {type: DataTypes.STRING, allowNull: false}
})

const Agents = sequelize.define('agents', {
    id,
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING},
    createdAt: {type: DataTypes.DATEONLY, allowNull: false, get(){
        const val = this.getDataValue('createdAt')
        if(val) return val.toLocaleString('ru-RU').substring(0, 10)
        return val;
    }},
    document: {type: DataTypes.TEXT, allowNull: false},
    house: {type: DataTypes.INTEGER, allowNull:false},
    flat: {type: DataTypes.INTEGER},
    block: {type: DataTypes.INTEGER},
    isDefault: {type: DataTypes.BOOLEAN, allowNull: false},
    noShowGroup: {type: DataTypes.BOOLEAN, allowNull: false},
    groupId: {type: DataTypes.INTEGER, allowNull: false},
    createdAt: {type: DataTypes.DATEONLY, allowNull: false, get(){
        const val = this.getDataValue('createdAt')
        if(val) return val.toLocaleString('ru-RU').substring(0, 10)
        return val;
    }}
});

const ExecutiveDocs = sequelize.define('executiveDocs', {
    id,
    number: {type: DataTypes.STRING, allowNull: false},
    dateIssue: {type: DataTypes.DATEONLY, allowNull: false, get(){
        const val = this.getDataValue('dateIssue')
        if(val) return val.toLocaleString('ru-RU').substring(0, 10)
        return val;
    }},
    resolutionNumber: {type: DataTypes.STRING},
    resolutionDate: {type: DataTypes.DATEONLY, get(){
        const val = this.getDataValue('resolutionDate');
        if(val) return val.toLocaleString('ru-RU').substring(0, 10)
        return val;
    }},
    main: {...money},
    percents: {...money},
    penalties: {...money},
    fee: {...money},
    sum: {...money},
})

const ExecutiveDocTypes = sequelize.define('executiveDocTypes', {
    id,
    name: {type: DataTypes.STRING, allowNull: false}
}, {timestamps: false})

const Bailiffs = sequelize.define('bailiffs', {
    id,
    name:  {type: DataTypes.STRING, allowNull: false, unique: true},
    house: {type: DataTypes.INTEGER, allowNull: false},
    block: {type: DataTypes.INTEGER},
    flat: {type: DataTypes.INTEGER}
})

Regions.hasMany(Bailiffs, {foreignKey: {allowNull: false}});
Cities.hasMany(Bailiffs, {foreignKey: {allowNull: false}});
Streets.hasMany(Bailiffs, {foreignKey: {allowNull: false}});
Bailiffs.belongsTo(Regions, {foreignKey: {allowNull: false}});
Bailiffs.belongsTo(Cities, {foreignKey: {allowNull: false}});
Bailiffs.belongsTo(Streets, {foreignKey: {allowNull: false}});
Bailiffs.belongsTo(Areas);
Areas.hasMany(Bailiffs);
Bailiffs.belongsTo(BlockTypes);
BlockTypes.hasMany(Bailiffs);
HouseTypes.hasMany(Bailiffs, {foreignKey: {allowNull: false}});
Bailiffs.belongsTo(HouseTypes, {foreignKey: {allowNull: false}});
FlatTypes.hasMany(Bailiffs);
Bailiffs.belongsTo(FlatTypes);
Contracts.belongsTo(Bailiffs);
Bailiffs.hasMany(Contracts);

ExecutiveDocs.belongsTo(Groups, {foreignKey: {allowNull: false}});
Groups.hasMany(ExecutiveDocs, {foreignKey: {allowNull: false}});
ExecutiveDocs.belongsTo(ExecutiveDocTypes, {foreignKey: {allowNull: false, name: 'typeId'}});
ExecutiveDocTypes.hasMany(ExecutiveDocs, {foreignKey: {allowNull: false, name: 'typeId'}});
ExecutiveDocs.belongsTo(Contracts, {foreignKey: {allowNull: false}});
Contracts.hasOne(ExecutiveDocs,  {foreignKey: {allowNull: false}});
Regions.hasMany(Agents, {foreignKey: {allowNull: false}});
Cities.hasMany(Agents, {foreignKey: {allowNull: false}});
Streets.hasMany(Agents, {foreignKey: {allowNull: false}});
Agents.belongsTo(Regions, {foreignKey: {allowNull: false}});
Agents.belongsTo(Cities, {foreignKey: {allowNull: false}});
Agents.belongsTo(Streets, {foreignKey: {allowNull: false}});
Agents.belongsTo(Areas);
Areas.hasMany(Agents);
Agents.belongsTo(BlockTypes);
BlockTypes.hasMany(Agents);
HouseTypes.hasMany(Agents, {foreignKey: {allowNull: false}});
Agents.belongsTo(HouseTypes, {foreignKey: {allowNull: false}});
FlatTypes.hasMany(Agents);
Agents.belongsTo(FlatTypes);
Groups.hasMany(Agents);
Agents.belongsTo(Groups);
Users.hasMany(Agents);
Agents.belongsTo(Users);


Users.belongsTo(Groups, {foreignKey: {allowNull: false}});
Groups.hasMany(Users, {foreignKey: {allowNull: false}});
Tasks.belongsTo(Users, {foreignKey: {
    name: 'creatorId',
    allowNull: false
}})
Users.hasOne(Tasks,
    {foreignKey: {
        name: 'creatorId',
        allowNull: false
    }});
Tasks.belongsToMany(Users, {foreignKey: {
    name: 'executorId',
    allowNull: false
}, through: UsersinTask})
Users.belongsToMany(Tasks, {foreignKey: {
    name: 'executorId',
    allowNull: false
}, through: UsersinTask })

UsersinTask.belongsTo(Tasks, {foreignKey: {
    allowNull: false
}})
Tasks.hasMany(UsersinTask, {foreignKey: { allowNull: false}})

Tokens.belongsTo(Users, {foreignKey:{ allowNull: false }});
Users.hasOne(Tokens, {foreignKey:{ allowNull: false }});
Courts.hasMany(Contracts);
Contracts.belongsTo(Courts);
Actions.belongsTo(ActionTypes, {foreignKey: {allowNull: false}});
ActionTypes.hasMany(Actions, {foreignKey: {allowNull: false}});
Actions.belongsTo(ActionObjects, {foreignKey: {allowNull: false}});
ActionObjects.hasMany(Actions, {foreignKey: {allowNull: false}});
Actions.belongsTo(Contracts, {foreignKey: {allowNull: false}});
Contracts.hasMany(Actions, {foreignKey: {allowNull: false}});
Actions.belongsTo(Users, {foreignKey: {allowNull: false}});
Users.hasMany(Actions, {foreignKey: {allowNull: false}});


Organizations.belongsTo(Groups, {foreignKey: {allowNull: false}});
Groups.hasMany(Organizations, {foreignKey: {allowNull: false}});
Debtors.belongsTo(Groups, {foreignKey: {allowNull: false}});
Groups.hasMany(Debtors, {foreignKey: {allowNull: false}});
Contracts.belongsTo(Groups, {foreignKey: {allowNull: false}});
Groups.hasMany(Contracts, {foreignKey: {allowNull: false}})
Users.hasMany(Messages);
Messages.belongsTo(Users, {foreignKey: {allowNull: false}});
Users.hasMany(Messages,{foreignKey: {allowNull: false}})
Debtors.hasMany(Contracts, {foreignKey: {allowNull: false}});
Contracts.belongsTo(Debtors, {foreignKey: {allowNull: false}});
Debtors.hasOne(Passports, {foreignKey: {allowNull: false}});
Passports.belongsTo(Debtors, {foreignKey: {allowNull: false}});
Contracts.hasMany(Payments, {foreignKey: {allowNull: false}});
Payments.belongsTo(Contracts, {foreignKey: {allowNull: false}});
Cessions.hasMany(Contracts);
Contracts.belongsTo(Cessions);
Contracts.belongsTo(Organizations, {foreignKey: {allowNull: false}});
Organizations.hasMany(Contracts, {foreignKey: {allowNull: false}});
Statuses.hasMany(Contracts, {foreignKey: {allowNull: false}});
Contracts.belongsTo(Statuses, {foreignKey: {allowNull: false}});
Contracts.belongsTo(ContractTypes, {
    foreignKey: {
        name: 'typeId',
        allowNull: false
    },
});
ContractTypes.hasMany(Contracts, {
    foreignKey: {
        name: 'typeId',
        allowNull: false
    },
});


Jurisdiction.belongsTo(Courts, {foreignKey: {allowNull: false}});
Courts.hasOne(Jurisdiction, {foreignKey: {allowNull: false}});

OrgTypes.hasMany(Organizations);
Organizations.belongsTo(OrgTypes);

Jurisdiction.belongsTo(Courts, {foreignKey: {allowNull: false}});
Courts.hasMany(Jurisdiction, {foreignKey: {allowNull: false}});
Jurisdiction.belongsTo(Cities, {foreignKey: {allowNull: false}});
Cities.hasMany(Jurisdiction, {foreignKey: {allowNull: false}});
Jurisdiction.belongsTo(Streets, {foreignKey: {allowNull: false}});
Streets.hasMany(Jurisdiction, {foreignKey: {allowNull: false}});
Jurisdiction.belongsTo(Regions, {foreignKey: {allowNull: false}});
Regions.hasMany(Jurisdiction, {foreignKey: {allowNull: false}});

Courts.belongsTo(CourtTypes, {foreignKey: {allowNull: false}});
CourtTypes.hasMany(Courts, {foreignKey: {allowNull: false}});
Courts.belongsTo(CourtLevels, {foreignKey: {allowNull: false}});
CourtLevels.hasMany(Courts, {foreignKey: {allowNull: false}});


Regions.hasMany(Organizations, {foreignKey: {allowNull: false}});
Regions.hasMany(Debtors, {foreignKey: {allowNull: false}});
Regions.hasMany(Courts, {foreignKey: {allowNull: false}});
Cities.hasMany(Organizations, {foreignKey: {allowNull: false}});
Cities.hasMany(Debtors, {foreignKey: {allowNull: false}});
Cities.hasMany(Courts, {foreignKey: {allowNull: false}});
Streets.hasMany(Organizations, {foreignKey: {allowNull: false}});
Streets.hasMany(Debtors, {foreignKey: {allowNull: false}});
Streets.hasMany(Courts,{foreignKey: {allowNull: false}});



Organizations.belongsTo(Regions, {foreignKey: {allowNull: false}});
Debtors.belongsTo(Regions, {foreignKey: {allowNull: false}});
Courts.belongsTo(Regions, {foreignKey: {allowNull: false}});
Organizations.belongsTo(Cities, {foreignKey: {allowNull: false}});
Debtors.belongsTo(Cities, {foreignKey: {allowNull: false}});
Courts.belongsTo(Cities, {foreignKey: {allowNull: false}});
Organizations.belongsTo(Streets, {foreignKey: {allowNull: false}});
Debtors.belongsTo(Streets, {foreignKey: {allowNull: false}});
Courts.belongsTo(Streets, {foreignKey: {allowNull: false}});
Debtors.belongsTo(Areas);
Areas.hasMany(Debtors)
Courts.belongsTo(Areas);
Areas.hasMany(Courts);
Organizations.belongsTo(Areas);
Areas.hasMany(Organizations);
Organizations.belongsTo(BlockTypes);
Debtors.belongsTo(BlockTypes);
Courts.belongsTo(BlockTypes);
BlockTypes.hasMany(Organizations);
BlockTypes.hasMany(Debtors);
BlockTypes.hasMany(Courts);

Organizations.belongsTo(Cities, {foreignKey: {allowNull: false}});
Debtors.belongsTo(Cities, {foreignKey: {allowNull: false}});
Courts.belongsTo(Cities, {foreignKey: {allowNull: false}});

CityTypes.hasMany(Cities, {foreignKey: {allowNull: false}});
Cities.belongsTo(CityTypes, {foreignKey: {allowNull: false}});
StreetTypes.hasMany(Streets, {foreignKey: {allowNull: false}});
Streets.belongsTo(StreetTypes, {foreignKey: {allowNull: false}});

RegionTypes.hasMany(Regions, {foreignKey: {allowNull: false}});
Regions.belongsTo(RegionTypes, {foreignKey: {allowNull: false}});

HouseTypes.hasMany(Debtors, {foreignKey: {allowNull: false}});
Debtors.belongsTo(HouseTypes, {foreignKey: {allowNull: false}});
HouseTypes.hasMany(Organizations, {foreignKey: {allowNull: false}});
Organizations.belongsTo(HouseTypes, {foreignKey: {allowNull: false}});
HouseTypes.hasMany(Courts, {foreignKey: {allowNull: false}});
Courts.belongsTo(HouseTypes, {foreignKey: {allowNull: false}});



FlatTypes.hasMany(Debtors);
Debtors.belongsTo(FlatTypes);
FlatTypes.hasMany(Organizations)
Organizations.belongsTo(FlatTypes);
FlatTypes.hasMany(Courts);
Courts.belongsTo(FlatTypes);


Organizations.hasMany(Cessions, {
    foreignKey: {
        name: 'assigneeId',
        allowNull: false
    },
    as: 'assignee'
});
Cessions.belongsTo(Organizations, {
    foreignKey: {
        name: 'assigneeId',
        allowNull: false
    },
    as: 'assignee'
});
Organizations.hasMany(Cessions, {
    foreignKey: {
        name: 'assignorId',
        allowNull: false,
    },
    as: 'assignor'  
});
Cessions.belongsTo(Organizations, {
    foreignKey: {
        name: 'assignorId',
        allowNull: false,
    },
    as: 'assignor'
});

Cessions.hasOne(Cessions, {
    foreignKey: 'prevCessionId'
});
Cessions.belongsTo(Cessions, {
    foreignKey: 'prevCessionId'
});





module.exports = {
    Jurisdiction, Organizations, Users, Messages, Debtors, Contracts, Payments, Courts, OrgTable, Passports, OrgTypes, Regions, Cities, Streets, CityTypes, StreetTypes, RegionTypes, HouseTypes, FlatTypes, Areas, Cessions, ContractTypes, Statuses, CourtLevels, CourtTypes, BlockTypes, Actions, ActionObjects, ActionTypes, Tokens, Tasks, UsersinTask, Groups, Agents, ExecutiveDocs, ExecutiveDocTypes, Bailiffs
}


