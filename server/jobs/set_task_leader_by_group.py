# for task_group in task_groups:
#   if task_group was changed since last run time:
#       for task in task_group:
#           +1 for entity in task in entities table
#            Entities Table
#            ---------------
#            TaskGroup - EntityName - Count
#            
#            sum_task = 0 
#           
#          for task in tasks:
#                for entity in task_entities:
#                    sum_task += entity_salience * entity_percentage
#                    
#            Get the task which has the max sum_task,
#            set it as task leader