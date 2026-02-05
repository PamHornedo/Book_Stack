import User from './User';
import Question from './Question';
import Answer from './Answer';
import Vote from './Vote';

User.hasMany(Question, { foreignKey: 'userId' });
Question.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Answer, { foreignKey: 'userId' });
Answer.belongsTo(User, { foreignKey: 'userId' });

Question.hasMany(Answer, { foreignKey: 'questionId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });

User.hasMany(Vote, { foreignKey: 'userId' });
Vote.belongsTo(User, { foreignKey: 'userId' });

Answer.hasMany(Vote, { foreignKey: 'answerId' });
Vote.belongsTo(Answer, { foreignKey: 'answerId' });

export { User, Question, Answer, Vote };
