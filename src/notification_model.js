class Notification {
	constructor(uuid, id, sender, content, receiver, read, retired, creationDate, updateDate){
		this.uuid = uuid
		this.id = id 
		this.sender = sender
		this.content = content 
		this.receiver = receiver 
		this.read = read 
		this.retired = retired 
		this.creationDate = creationDate 
		this.updateDate = updateDate
	}
}