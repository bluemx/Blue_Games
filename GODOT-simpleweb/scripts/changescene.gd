extends Button
@export var scene_name:String

func _ready():
	pressed.connect(_on_pressed.bind(scene_name))

func _on_pressed(scene:String) -> void:
	get_tree().change_scene_to_file("res://scenes/%s.tscn" % scene)
