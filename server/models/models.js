const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const Debtors = require('./subjects/Debtor');
const Contracts = require('./documents/Contracts');
const {PassportTypes} = require("./PassportType");
const Passports = require("./documents/Passport");
const ExecutiveDocs = require("./documents/ExecutiveDocs");
const InitTemplates = require('./templates/initTemplates');
const Organizations = require('./subjects/Organizations');
const Courts = require('./subjects/Courts');
const Agents = require('./subjects/Agents');
const Bailiffs = require('./subjects/Bailiffs');
const Cessions = require('./documents/Cessions');
const CessionsInfo = require('./documents/CessionsInfo');
const CessionsEnclosures = require("./documents/CessionsEnclosures");


const Jurisdiction = sequelize.define('jurisdiction', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
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

const Payments = sequelize.define('payments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    sum: {type: DataTypes.DECIMAL(10,2), allowNull: false },
    percents: {type: DataTypes.DECIMAL(10,2), },
    penalties: {type: DataTypes.DECIMAL(10,2), defaultValue: 0},
    main: {type: DataTypes.DECIMAL(10,2), defaultValue: 0},
    date: {type:DataTypes.DATEONLY, allowNull: false}  
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
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, allowNull: false},
})
const RegionTypes = sequelize.define('region_types', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const HouseTypes = sequelize.define('house_types', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const FlatTypes = sequelize.define('flat_types', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const CityTypes = sequelize.define('city_types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const StreetTypes = sequelize.define('street_types', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const Statuses = sequelize.define('statuses', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, {timestamps: false});
const ContractTypes = sequelize.define('contract_types', {
        id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},

},
{timestamps:false}
)
const CourtTypes = sequelize.define('court_types', {
        id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
},
{timestamps:false}
);
const CourtLevels = sequelize.define('court_levels', {
        id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
},
{timestamps:false}
);
const BlockTypes = sequelize.define('block_types', {
        id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    short: {type: DataTypes.STRING, unique: true, allowNull: false}
},
{timestamps:false}
);
const Actions = sequelize.define('actions', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    result: {type: DataTypes.TEXT, allowNull: false}, 
    createdAt: {type: DataTypes.DATE, allowNull: false, get(){
        return this.getDataValue('createdAt')
        .toLocaleString('ru-RU');
    }}
})
const ActionTypes = sequelize.define('actionTypes', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, {timestamps: false})
const ActionObjects = sequelize.define('actionObjects', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
}, {timestamps: false});

const Tokens = sequelize.define('tokens', {
    id: InitTemplates.id(),
    token: {type: DataTypes.STRING, allowNull: false}
}, {timestamps: false});

const Tasks = sequelize.define('tasks', {
    id: InitTemplates.id(),
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
    id: InitTemplates.id(),
}, {timestamps:false});

const Groups = sequelize.define('groups', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, allowNull: false}
})


const ExecutiveDocTypes = sequelize.define('executiveDocTypes', {
    id: InitTemplates.id(),
    name: {type: DataTypes.STRING, allowNull: false}
}, {timestamps: false})


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
// Contracts.belongsTo(Bailiffs);
// Bailiffs.hasMany(Contracts);
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
Debtors.belongsTo(Groups, {foreignKey: {allowNull: false}});
Groups.hasMany(Debtors, {foreignKey: {allowNull: false}});


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
// Courts.hasMany(Contracts);
// Contracts.belongsTo(Courts);
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
Users.hasMany(Messages);
Messages.belongsTo(Users, {foreignKey: {allowNull: false}});
Users.hasMany(Messages,{foreignKey: {allowNull: false}})

Contracts.hasMany(Payments, {foreignKey: {allowNull: false}});
Payments.belongsTo(Contracts, {foreignKey: {allowNull: false}});


Jurisdiction.belongsTo(Courts, {foreignKey: {allowNull: false}});
Courts.hasOne(Jurisdiction, {foreignKey: {allowNull: false}});

OrgTypes.hasMany(Organizations);
Organizations.belongsTo(OrgTypes);



Contracts.belongsTo(Groups, {foreignKey: {allowNull: false}});
Groups.hasMany(Contracts, {foreignKey: {allowNull: false}});
Debtors.hasMany(Contracts, {foreignKey: {allowNull: false}});
Contracts.belongsTo(Debtors, {foreignKey: {allowNull: false}});
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

PassportTypes.hasMany(Passports, {foreignKey: {name: 'typeId', allowNull: false}});
Passports.belongsTo(PassportTypes, {foreignKey: {name: 'typeId', allowNull: false}});
Debtors.hasOne(Passports, {foreignKey: {allowNull: false}});
Passports.belongsTo(Debtors, {foreignKey: {allowNull: false}});
Passports.belongsTo(Groups, {foreignKey: {allowNull: false}});
Groups.hasMany(Passports, {foreignKey: {allowNull: false}});



FlatTypes.hasMany(Debtors);
Debtors.belongsTo(FlatTypes);
FlatTypes.hasMany(Organizations)
Organizations.belongsTo(FlatTypes);
FlatTypes.hasMany(Courts);
Courts.belongsTo(FlatTypes);


Organizations.hasMany(CessionsInfo, {
    foreignKey: {
        name: 'assigneeId',
        allowNull: false,
    },
    as: 'assignee'
});
CessionsInfo.belongsTo(Organizations, {
    foreignKey: {
        name: 'assigneeId',
        allowNull: false
    },
    as: 'assignee'
});
Organizations.hasMany(CessionsInfo, {
    foreignKey: {
        name: 'assignorId',
        allowNull: false,
    },
    as: 'assignor'  
});
CessionsInfo.belongsTo(Organizations, {
    foreignKey: {
        name: 'assignorId',
        allowNull: false,
    },
    as: 'assignor'
});

CessionsInfo.belongsTo(Cessions, InitTemplates.notNullForeignKey());
Cessions.hasMany(CessionsInfo, InitTemplates.notNullForeignKey());
Cessions.belongsTo(Organizations, {foreignKey: {name: 'lastAssigneeId', allowNull: false}, as: 'lastAssignee'});
Organizations.hasMany(Cessions, {foreignKey: {name: 'lastAssigneeId', allowNull: false}, as: 'lastAssignee'});
Cessions.belongsTo(Organizations, {foreignKey: {name: 'lastAssignorId', allowNull: false}, as: 'lastAssignor'});
Organizations.hasMany(Cessions, {foreignKey: {name: 'lastAssignorId', allowNull: false}, as: 'lastAssignor'});
Cessions.belongsTo(Groups, InitTemplates.notNullForeignKey());
Groups.hasMany(Cessions, InitTemplates.notNullForeignKey());
CessionsInfo.belongsTo(Groups, InitTemplates.notNullForeignKey());
Groups.hasMany(CessionsInfo, InitTemplates.notNullForeignKey());
CessionsInfo.hasMany(CessionsEnclosures, {foreignKey: {name: 'cessionsInfoId', allowNull: false}});
CessionsEnclosures.belongsTo(CessionsInfo, {foreignKey: {name: 'cessionsInfoId', allowNull: false}});

ExecutiveDocs.belongsTo(Groups, {foreignKey: {allowNull: false}});
Groups.hasMany(ExecutiveDocs, {foreignKey: {allowNull: false}});
ExecutiveDocs.belongsTo(ExecutiveDocTypes, {foreignKey: {allowNull: false, name: 'typeId'}});
ExecutiveDocTypes.hasMany(ExecutiveDocs, {foreignKey: {allowNull: false, name: 'typeId'}});
ExecutiveDocs.belongsTo(Contracts, {foreignKey: {allowNull: false}});
Contracts.hasOne(ExecutiveDocs,  {foreignKey: {allowNull: false}});
ExecutiveDocs.belongsTo(Courts, {foreignKey: {allowNull: false}});
Courts.hasMany(ExecutiveDocs, InitTemplates.notNullForeignKey());





module.exports = {
    Jurisdiction, Users, Messages, Payments, OrgTable, OrgTypes, Regions, Cities, Streets, CityTypes, StreetTypes, RegionTypes, HouseTypes, FlatTypes, Areas, ContractTypes, Statuses, CourtLevels, CourtTypes, BlockTypes, Actions, ActionObjects, ActionTypes, Tokens, Tasks, UsersinTask, Groups, ExecutiveDocTypes,
}


