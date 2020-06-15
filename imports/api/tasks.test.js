import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { Tasks } from './tasks';
import { assert } from 'chai';

if (Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: Random.hexString(100),
                    createdAt: new Date(),
                    owner: userId,
                    username: Random.hexString(10),
                })
            });

            it('can delete owned task', () => {
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];
                const invocation = { userId };
                deleteTask.apply(invocation, [taskId]);
                assert.equal(Tasks.find({}).count(), 0);
            });
        });
    })
}