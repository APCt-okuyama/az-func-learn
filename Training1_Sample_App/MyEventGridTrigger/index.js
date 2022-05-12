module.exports = async function (context, eventGridEvent) {

    context.log(typeof eventGridEvent);
    //context.log(eventGridEvent);
    context.log('MyEventGridTrigger:' + JSON.stringify(eventGridEvent));

    //cosmos dbへ出力する
    context.bindings.durablelog = JSON.stringify(eventGridEvent);
};