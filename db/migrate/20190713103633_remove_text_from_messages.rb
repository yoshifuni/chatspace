class RemoveTextFromMessages < ActiveRecord::Migration[5.0]
  def change
    remove_column :messages, :text, :text
  end
end
